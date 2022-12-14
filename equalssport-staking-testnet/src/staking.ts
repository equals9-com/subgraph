import { BigInt } from "@graphprotocol/graph-ts"
import {
  Staking,
  OwnershipTransferred,
  Paused,
  Staked,
  Unpaused,
  Unstaked
} from "../generated/Staking/Staking"
import { ExampleEntity, Player, Stake, Staker } from "../generated/schema"

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.claimAmount(...)
  // - contract.fetchPlayerStakes(...)
  // - contract.fetchStakersAmount(...)
  // - contract.lastTimeUserUnstake(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.paused(...)
  // - contract.stakerAmounts(...)
  // - contract.stakerTimestamps(...)
}

export function handlePaused(event: Paused): void {}

export function handleStaked(event: Staked): void {  
  const amount = event.params.amount;
  const playerAddress = event.params.player;
  const stakerAddress = event.params.staker;
  const timestamp = event.params.timestamp;

  let player = Player.load(playerAddress.toString())

  if (!player) {
    player = new Player(playerAddress.toString())
    player.totalStaked = amount;
    player.address = playerAddress
    player.stakesAmount = 1
  } else {
    player.totalStaked = amount.plus(player.totalStaked)
  }

  let staker = Staker.load(stakerAddress.toString())
  if (!staker) {
    staker = new Staker(stakerAddress.toString())
    staker.totalStaked = amount;
    staker.address = stakerAddress
    staker.stakesAmount = 1;
  } else {
    staker.totalStaked = amount.plus(staker.totalStaked)
  }

  let stake = Stake.load(stakerAddress.toHexString() + "-" + playerAddress.toHexString())

  if(!stake){
    stake = new Stake(stakerAddress.toHexString() + "-" + playerAddress.toHexString())
    stake.amount = amount;
    stake.staker = staker.id;
    stake.player = player.id;
    stake.timestamp = timestamp;
    staker.stakesAmount = staker.stakesAmount + 1
    player.stakesAmount = player.stakesAmount + 1
  } else {
    if (stake.amount.equals(BigInt.zero())) {
      staker.stakesAmount = staker.stakesAmount + 1
      player.stakesAmount = player.stakesAmount + 1
    }
    stake.amount = stake.amount.plus(amount)
  }


  staker.save()
  player.save()
  stake.save()
  return
}

export function handleUnpaused(event: Unpaused): void {





}

export function handleUnstaked(event: Unstaked): void {
    const amount = event.params.amount;
    const playerAddress = event.params.player;
    const stakerAddress = event.params.staker;

    let player = Player.load(playerAddress.toString())

    if(player){
      player.totalStaked = player.totalStaked.minus(amount);
    } 

    let staker = Staker.load(stakerAddress.toString())
    if (staker){
      staker.totalStaked = staker.totalStaked.minus(amount)
    }

    let stake = Stake.load(stakerAddress.toHexString() + "-" + playerAddress.toHexString())  
    if (stake){
      stake.amount = stake.amount.minus(amount)
      if(stake.amount.equals(BigInt.zero())) {
        stake.timestamp = BigInt.zero() 
        if(staker && player){
          staker.stakesAmount = staker.stakesAmount - 1
          player.stakesAmount = player.stakesAmount - 1
        }
      }
    }

  if(player && staker && stake){
      player.save()
      stake.save()
      staker.save()
  }
    return
}



