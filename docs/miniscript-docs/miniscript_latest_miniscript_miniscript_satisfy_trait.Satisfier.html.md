Docs.rs
  * miniscript-12.3.0
    * miniscript 12.3.0 
    * Permalink 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Homepage 
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * sanket1729 
    * Dependencies
    *       * serde ^1.0.103 _normal_ _optional_
      * bech32 ^0.11.0 _normal_
      * bitcoin ^0.32.0 _normal_
      * bitcoin ^0.32.0 _dev_
      * secp256k1 ^0.29.0 _dev_
      * serde_test ^1.0.147 _dev_
    * Versions
    * **100%** of the crate is documented 
  * Platform
    * i686-unknown-linux-gnu
    * x86_64-unknown-linux-gnu
  * Feature flags


  * Rust
    * About docs.rs 
    * Privacy policy 
    * Rust website 
    * The Book 
    * Standard Library API Reference 
    * Rust by Example 
    * The Cargo Guide 
    * Clippy Documentation 


miniscript::miniscript::satisfy
# Trait SatisfierCopy item path
Settings
Help
SummarySource
```
pub trait Satisfier<Pk: MiniscriptKey + ToPublicKey> {
Show 14 methods  // Provided methods
  fn lookup_ecdsa_sig(&self, _: &Pk) -> Option<Signature> { ... }
  fn lookup_tap_key_spend_sig(&self) -> Option<Signature> { ... }
  fn lookup_tap_leaf_script_sig(
    &self,
    _: &Pk,
    _: &TapLeafHash,
  ) -> Option<Signature> { ... }
  fn lookup_tap_control_block_map(
    &self,
  ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>> { ... }
  fn lookup_raw_pkh_pk(&self, _: &Hash) -> Option<PublicKey> { ... }
  fn lookup_raw_pkh_x_only_pk(&self, _: &Hash) -> Option<XOnlyPublicKey> { ... }
  fn lookup_raw_pkh_ecdsa_sig(
    &self,
    _: &Hash,
  ) -> Option<(PublicKey, Signature)> { ... }
  fn lookup_raw_pkh_tap_leaf_script_sig(
    &self,
    _: &(Hash, TapLeafHash),
  ) -> Option<(XOnlyPublicKey, Signature)> { ... }
  fn lookup_sha256(&self, _: &Pk::Sha256) -> Option<Preimage32> { ... }
  fn lookup_hash256(&self, _: &Pk::Hash256) -> Option<Preimage32> { ... }
  fn lookup_ripemd160(&self, _: &Pk::Ripemd160) -> Option<Preimage32> { ... }
  fn lookup_hash160(&self, _: &Pk::Hash160) -> Option<Preimage32> { ... }
  fn check_older(&self, _: LockTime) -> bool { ... }
  fn check_after(&self, _: LockTime) -> bool { ... }
}
```
Expand description
Trait describing a lookup table for signatures, hash preimages, etc. Every method has a default implementation that simply returns `None` on every query. Users are expected to override the methods that they have data for.
## Provided Methods§
Source
#### fn lookup_ecdsa_sig(&self, _: &Pk) -> Option<Signature>
Given a public key, look up an ECDSA signature with that key
Source
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Lookup the tap key spend sig
Source
#### fn lookup_tap_leaf_script_sig( &self, _: &Pk, _: &TapLeafHash, ) -> Option<Signature>
Given a public key and a associated leaf hash, look up an schnorr signature with that key
Source
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Obtain a reference to the control block for a ver and script
Source
#### fn lookup_raw_pkh_pk(&self, _: &Hash) -> Option<PublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::PublicKey`
Source
#### fn lookup_raw_pkh_x_only_pk(&self, _: &Hash) -> Option<XOnlyPublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::secp256k1::XOnlyPublicKey`
Source
#### fn lookup_raw_pkh_ecdsa_sig(&self, _: &Hash) -> Option<(PublicKey, Signature)>
Given a keyhash, look up the EC signature and the associated key Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, _: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Given a keyhash, look up the schnorr signature and the associated key Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source
#### fn lookup_sha256(&self, _: &Pk::Sha256) -> Option<Preimage32>
Given a SHA256 hash, look up its preimage
Source
#### fn lookup_hash256(&self, _: &Pk::Hash256) -> Option<Preimage32>
Given a HASH256 hash, look up its preimage
Source
#### fn lookup_ripemd160(&self, _: &Pk::Ripemd160) -> Option<Preimage32>
Given a RIPEMD160 hash, look up its preimage
Source
#### fn lookup_hash160(&self, _: &Pk::Hash160) -> Option<Preimage32>
Given a HASH160 hash, look up its preimage
Source
#### fn check_older(&self, _: LockTime) -> bool
Assert whether an relative locktime is satisfied
NOTE: If a descriptor mixes time-based and height-based timelocks, the implementation of this method MUST only allow timelocks of either unit, but not both. Allowing both could cause miniscript to construct an invalid witness.
Source
#### fn check_after(&self, _: LockTime) -> bool
Assert whether a absolute locktime is satisfied
NOTE: If a descriptor mixes time-based and height-based timelocks, the implementation of this method MUST only allow timelocks of either unit, but not both. Allowing both could cause miniscript to construct an invalid witness.
## Implementations on Foreign Types§
Source§
### impl<'a, Pk: MiniscriptKey + ToPublicKey, S: Satisfier<Pk>> Satisfier<Pk> for &'a S
Source§
#### fn lookup_ecdsa_sig(&self, p: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, p: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_pk(&self, pkh: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, pkh: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_raw_pkh_ecdsa_sig(&self, pkh: &Hash) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, pkh: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, t: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<'a, Pk: MiniscriptKey + ToPublicKey, S: Satisfier<Pk>> Satisfier<Pk> for &'a mut S
Source§
#### fn lookup_ecdsa_sig(&self, p: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, p: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_pk(&self, pkh: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, pkh: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_raw_pkh_ecdsa_sig(&self, pkh: &Hash) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, pkh: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, t: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, B, C, D, E, F, G, H, Pk> Satisfier<Pk> for (A, B, C, D, E, F, G, H)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>, B: Satisfier<Pk>, C: Satisfier<Pk>, D: Satisfier<Pk>, E: Satisfier<Pk>, F: Satisfier<Pk>, G: Satisfier<Pk>, H: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, B, C, D, E, F, G, Pk> Satisfier<Pk> for (A, B, C, D, E, F, G)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>, B: Satisfier<Pk>, C: Satisfier<Pk>, D: Satisfier<Pk>, E: Satisfier<Pk>, F: Satisfier<Pk>, G: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, B, C, D, E, F, Pk> Satisfier<Pk> for (A, B, C, D, E, F)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>, B: Satisfier<Pk>, C: Satisfier<Pk>, D: Satisfier<Pk>, E: Satisfier<Pk>, F: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, B, C, D, E, Pk> Satisfier<Pk> for (A, B, C, D, E)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>, B: Satisfier<Pk>, C: Satisfier<Pk>, D: Satisfier<Pk>, E: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, B, C, D, Pk> Satisfier<Pk> for (A, B, C, D)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>, B: Satisfier<Pk>, C: Satisfier<Pk>, D: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, B, C, Pk> Satisfier<Pk> for (A, B, C)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>, B: Satisfier<Pk>, C: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, B, Pk> Satisfier<Pk> for (A, B)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>, B: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<A, Pk> Satisfier<Pk> for (A,)
where Pk: MiniscriptKey + ToPublicKey, A: Satisfier<Pk>,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, key_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, key_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
#### fn lookup_raw_pkh_pk(&self, key_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, key_hash: &Hash) -> Option<XOnlyPublicKey>
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Source§
#### fn lookup_sha256(&self, h: &Pk::Sha256) -> Option<Preimage32>
Source§
#### fn lookup_hash256(&self, h: &Pk::Hash256) -> Option<Preimage32>
Source§
#### fn lookup_ripemd160(&self, h: &Pk::Ripemd160) -> Option<Preimage32>
Source§
#### fn lookup_hash160(&self, h: &Pk::Hash160) -> Option<Preimage32>
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<Pk> Satisfier<Pk> for BTreeMap<(Hash, TapLeafHash), (Pk, Signature)>
where Pk: MiniscriptKey + ToPublicKey,
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, pk_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
### impl<Pk> Satisfier<Pk> for BTreeMap<Hash, (Pk, Signature)>
where Pk: MiniscriptKey + ToPublicKey,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_pk(&self, pk_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, pk_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
### impl<Pk> Satisfier<Pk> for HashMap<(Hash, TapLeafHash), (Pk, Signature)>
where Pk: MiniscriptKey + ToPublicKey,
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, pk_hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Source§
### impl<Pk> Satisfier<Pk> for HashMap<Hash, (Pk, Signature)>
where Pk: MiniscriptKey + ToPublicKey,
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
#### fn lookup_raw_pkh_pk(&self, pk_hash: &Hash) -> Option<PublicKey>
Source§
#### fn lookup_raw_pkh_ecdsa_sig( &self, pk_hash: &Hash, ) -> Option<(PublicKey, Signature)>
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for LockTime
Source§
#### fn check_after(&self, n: LockTime) -> bool
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for LockTime
Source§
#### fn check_older(&self, n: LockTime) -> bool
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for ()
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for BTreeMap<(Pk, TapLeafHash), Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for BTreeMap<Pk, Signature>
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for HashMap<(Pk, TapLeafHash), Signature>
Source§
#### fn lookup_tap_leaf_script_sig( &self, key: &Pk, h: &TapLeafHash, ) -> Option<Signature>
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for HashMap<Pk, Signature>
Source§
#### fn lookup_ecdsa_sig(&self, key: &Pk) -> Option<Signature>
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for Sequence
Source§
#### fn check_older(&self, n: LockTime) -> bool
## Implementors§
Source§
### impl<'psbt, Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for PsbtInputSatisfier<'psbt>
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for RelLockTime
