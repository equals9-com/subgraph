// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Claimed extends ethereum.Event {
  get params(): Claimed__Params {
    return new Claimed__Params(this);
  }
}

export class Claimed__Params {
  _event: Claimed;

  constructor(event: Claimed) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get staker(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Staked extends ethereum.Event {
  get params(): Staked__Params {
    return new Staked__Params(this);
  }
}

export class Staked__Params {
  _event: Staked;

  constructor(event: Staked) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get player(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get staker(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Unstaked extends ethereum.Event {
  get params(): Unstaked__Params {
    return new Unstaked__Params(this);
  }
}

export class Unstaked__Params {
  _event: Unstaked;

  constructor(event: Unstaked) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get player(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get staker(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class Staking__fetchPlayerStakesResult {
  value0: Array<Address>;
  value1: Array<BigInt>;
  value2: Array<BigInt>;

  constructor(
    value0: Array<Address>,
    value1: Array<BigInt>,
    value2: Array<BigInt>
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddressArray(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigIntArray(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigIntArray(this.value2));
    return map;
  }

  getStakers_(): Array<Address> {
    return this.value0;
  }

  getAmounts_(): Array<BigInt> {
    return this.value1;
  }

  getTimestamps_(): Array<BigInt> {
    return this.value2;
  }
}

export class Staking extends ethereum.SmartContract {
  static bind(address: Address): Staking {
    return new Staking("Staking", address);
  }

  claimAmount(param0: Address): BigInt {
    let result = super.call("claimAmount", "claimAmount(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_claimAmount(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimAmount",
      "claimAmount(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  fetchPlayerStakes(
    _player: Address,
    _start: BigInt,
    _limit: BigInt
  ): Staking__fetchPlayerStakesResult {
    let result = super.call(
      "fetchPlayerStakes",
      "fetchPlayerStakes(address,uint256,uint256):(address[],uint256[],uint256[])",
      [
        ethereum.Value.fromAddress(_player),
        ethereum.Value.fromUnsignedBigInt(_start),
        ethereum.Value.fromUnsignedBigInt(_limit)
      ]
    );

    return new Staking__fetchPlayerStakesResult(
      result[0].toAddressArray(),
      result[1].toBigIntArray(),
      result[2].toBigIntArray()
    );
  }

  try_fetchPlayerStakes(
    _player: Address,
    _start: BigInt,
    _limit: BigInt
  ): ethereum.CallResult<Staking__fetchPlayerStakesResult> {
    let result = super.tryCall(
      "fetchPlayerStakes",
      "fetchPlayerStakes(address,uint256,uint256):(address[],uint256[],uint256[])",
      [
        ethereum.Value.fromAddress(_player),
        ethereum.Value.fromUnsignedBigInt(_start),
        ethereum.Value.fromUnsignedBigInt(_limit)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Staking__fetchPlayerStakesResult(
        value[0].toAddressArray(),
        value[1].toBigIntArray(),
        value[2].toBigIntArray()
      )
    );
  }

  fetchStakersAmount(_player: Address): BigInt {
    let result = super.call(
      "fetchStakersAmount",
      "fetchStakersAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_player)]
    );

    return result[0].toBigInt();
  }

  try_fetchStakersAmount(_player: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "fetchStakersAmount",
      "fetchStakersAmount(address):(uint256)",
      [ethereum.Value.fromAddress(_player)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  lastTimeUserUnstake(param0: Address): BigInt {
    let result = super.call(
      "lastTimeUserUnstake",
      "lastTimeUserUnstake(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_lastTimeUserUnstake(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastTimeUserUnstake",
      "lastTimeUserUnstake(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  stakerAmounts(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "stakerAmounts",
      "stakerAmounts(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_stakerAmounts(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "stakerAmounts",
      "stakerAmounts(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  stakerTimestamps(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "stakerTimestamps",
      "stakerTimestamps(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_stakerTimestamps(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "stakerTimestamps",
      "stakerTimestamps(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _eq9Contract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClaimCall extends ethereum.Call {
  get inputs(): ClaimCall__Inputs {
    return new ClaimCall__Inputs(this);
  }

  get outputs(): ClaimCall__Outputs {
    return new ClaimCall__Outputs(this);
  }
}

export class ClaimCall__Inputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class ClaimCall__Outputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RevertStakesFromAPlayerCall extends ethereum.Call {
  get inputs(): RevertStakesFromAPlayerCall__Inputs {
    return new RevertStakesFromAPlayerCall__Inputs(this);
  }

  get outputs(): RevertStakesFromAPlayerCall__Outputs {
    return new RevertStakesFromAPlayerCall__Outputs(this);
  }
}

export class RevertStakesFromAPlayerCall__Inputs {
  _call: RevertStakesFromAPlayerCall;

  constructor(call: RevertStakesFromAPlayerCall) {
    this._call = call;
  }

  get _staker(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _player(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevertStakesFromAPlayerCall__Outputs {
  _call: RevertStakesFromAPlayerCall;

  constructor(call: RevertStakesFromAPlayerCall) {
    this._call = call;
  }
}

export class StakeCall extends ethereum.Call {
  get inputs(): StakeCall__Inputs {
    return new StakeCall__Inputs(this);
  }

  get outputs(): StakeCall__Outputs {
    return new StakeCall__Outputs(this);
  }
}

export class StakeCall__Inputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _player(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class StakeCall__Outputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnstakeCall extends ethereum.Call {
  get inputs(): UnstakeCall__Inputs {
    return new UnstakeCall__Inputs(this);
  }

  get outputs(): UnstakeCall__Outputs {
    return new UnstakeCall__Outputs(this);
  }
}

export class UnstakeCall__Inputs {
  _call: UnstakeCall;

  constructor(call: UnstakeCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _player(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class UnstakeCall__Outputs {
  _call: UnstakeCall;

  constructor(call: UnstakeCall) {
    this._call = call;
  }
}
