# Strategic Bitcoin Reserve (SBR) Lockup Mechanism Demo

This repository demonstrates how Taproot and Miniscript can be used to create secure lockup mechanisms for a Strategic Bitcoin Reserve (SBR). These mechanisms enforce strict spending conditions that minimize the risk of unauthorized access while providing emergency access paths when needed.

## Key Concepts Demonstrated

1. **Multi-Signature Requirements**: Requires multiple parties (e.g., a committee) to authorize spending, preventing unilateral access
2. **Timelocks**: Different time-based conditions for accessing funds, including:
   - Absolute timelocks (can't spend until a certain time)
   - Relative timelocks (must wait a certain period after a condition)
3. **Taproot Integration**: Hides complex spending conditions and improves privacy
4. **Miniscript Policies**: Creates human-readable and analyzable spending policies

## Lockup Scenarios

The demo implements three different lockup scenarios with increasing complexity:

1. **Basic 3-of-5 Multisig**: Requires signatures from at least 3 out of 5 committee members
2. **Multisig with Emergency Timelock**: Either 3-of-5 signatures OR after 1 year (emergency access)
3. **Complex Policy**:
   - 3-of-5 signatures (normal operation), OR
   - 2-of-5 signatures after 6 months (partial committee with delay), OR
   - After 2 years (ultimate emergency access)

## Benefits for a Strategic Bitcoin Reserve

- **Security**: Multiple signing authorities prevent capture by any single entity
- **Transparency**: Policies are auditable and clearly defined
- **Flexibility**: Different spending paths for different scenarios
- **Privacy**: Taproot hides complex spending conditions until used
- **Robustness**: Emergency access paths if keys are lost or committee unavailable

## Running the Demo

To run the demo:

```bash
cargo run --bin sbr_lockup
```

The demo will:
1. Create different lockup policies using Miniscript
2. Explain the requirements for each policy
3. Generate a Taproot output descriptor and Bitcoin address for the complex policy
4. Highlight security benefits of this approach

## Requirements

- Rust (latest stable version)
- The `bitcoin` and `miniscript` crates

## Further Reading

- [BIP 341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)
- [Miniscript](https://bitcoin.sipa.be/miniscript/)
- [Output Descriptors](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md)
