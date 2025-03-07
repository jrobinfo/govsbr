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


miniscript
# Macro translate_hash_failCopy item path
Settings
Help
SummarySource
```
macro_rules! translate_hash_fail {
  ($source: ty, $target:ty, $error_ty: ty) => { ... };
}
```
Expand description
Macro for failing translation for other associated types. Handy for testing String -> concrete keys as we don’t want to specify these functions repeatedly.
This macro is handy when dealing with scripts that are only contain keys. See also `crate::translate_hash_clone`
```
use miniscript::{bitcoin::PublicKey, policy::concrete::Policy, Translator, hash256};
use std::str::FromStr;
use miniscript::translate_hash_fail;
use std::collections::HashMap;
use miniscript::bitcoin::hashes::{sha256, hash160, ripemd160};
let alice_key = "0270cf3c71f65a3d93d285d9149fddeeb638f87a2d4d8cf16c525f71c417439777";
let bob_key = "02f43b15c50a436f5335dbea8a64dd3b4e63e34c3b50c42598acb5f4f336b5d2fb";
let placeholder_policy = Policy::<String>::from_str("and(pk(alice_key),pk(bob_key))").unwrap();
// Information to translator abstract String type keys to concrete bitcoin::PublicKey.
// In practice, wallets would map from String key names to BIP32 keys
struct StrPkTranslator {
  pk_map: HashMap<String, bitcoin::PublicKey>
}
// If we also wanted to provide mapping of other associated types(sha256, older etc),
// we would use the general Translator Trait.
impl Translator<String, bitcoin::PublicKey, ()> for StrPkTranslator {
  // Provides the translation public keys P -> Q
  fn pk(&mut self, pk: &String) -> Result<bitcoin::PublicKey, ()> {
    self.pk_map.get(pk).copied().ok_or(()) // Dummy Err
  }
  // Fail for hash types
  translate_hash_fail!(String, bitcoin::PublicKey, ());
}
let mut pk_map = HashMap::new();
pk_map.insert(String::from("alice_key"), bitcoin::PublicKey::from_str(alice_key).unwrap());
pk_map.insert(String::from("bob_key"), bitcoin::PublicKey::from_str(bob_key).unwrap());
let mut t = StrPkTranslator { pk_map: pk_map };
```

