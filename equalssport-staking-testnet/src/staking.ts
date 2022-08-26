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
  let player = Player.load(event.params.player.toString())
  if (!player) {
    player = new Player(event.params.player.toString())
    player.totalStaked = event.params.amount;
    player.save()
  }
  let staker = Staker.load(event.params.staker.toString())
  if (!staker) {
    staker = new Staker(event.params.staker.toString())
    staker.totalStaked = event.params.amount;
    staker.save()
  }

  let stake = Stake.load(event.params.staker.toString() + "-" + event.params.player.toString())

  if(!stake){
    stake = new Stake(event.params.staker.toString() + "-" + event.params.player.toString())
    stake.amount = event.params.amount;
    stake.staker = event.params.staker.toString();
    stake.player = event.params.player.toString();
    stake.timestamp = event.params.timestamp;
    stake.save()
    return;
  } else {
      stake.amount = stake.amount.plus(event.params.amount)
      stake.save()
  }

}

export function handleUnpaused(event: Unpaused): void {}

export function handleUnstaked(event: Unstaked): void {}



