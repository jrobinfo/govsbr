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
# Trait FromStrKeyCopy item path
Settings
Help
SummarySource
```
pub trait FromStrKey: MiniscriptKey<Sha256 = Self::_Sha256, Hash256 = Self::_Hash256, Ripemd160 = Self::_Ripemd160, Hash160 = Self::_Hash160> + FromStr<Err = Self::_FromStrErr> {
  type _Sha256: FromStr<Err = Self::_Sha256FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash;
  type _Sha256FromStrErr: Debug + Display;
  type _Hash256: FromStr<Err = Self::_Hash256FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash;
  type _Hash256FromStrErr: Debug + Display;
  type _Ripemd160: FromStr<Err = Self::_Ripemd160FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash;
  type _Ripemd160FromStrErr: Debug + Display;
  type _Hash160: FromStr<Err = Self::_Hash160FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash;
  type _Hash160FromStrErr: Debug + Display;
  type _FromStrErr: Debug + Display;
}
```
Expand description
Blanket trait describing a key where all associated types implement `FromStr`, and all `FromStr` errors can be displayed.
## Required Associated Types§
Source
#### type _Sha256: FromStr<Err = Self::_Sha256FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash
Dummy type. Do not use.
Source
#### type _Sha256FromStrErr: Debug + Display
Dummy type. Do not use.
Source
#### type _Hash256: FromStr<Err = Self::_Hash256FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash
Dummy type. Do not use.
Source
#### type _Hash256FromStrErr: Debug + Display
Dummy type. Do not use.
Source
#### type _Ripemd160: FromStr<Err = Self::_Ripemd160FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash
Dummy type. Do not use.
Source
#### type _Ripemd160FromStrErr: Debug + Display
Dummy type. Do not use.
Source
#### type _Hash160: FromStr<Err = Self::_Hash160FromStrErr> + Clone + Eq + Ord + Display + Debug + Hash
Dummy type. Do not use.
Source
#### type _Hash160FromStrErr: Debug + Display
Dummy type. Do not use.
Source
#### type _FromStrErr: Debug + Display
Dummy type. Do not use.
## Dyn Compatibility§
This trait is **not** dyn compatible.
_In older versions of Rust, dyn compatibility was called "object safety", so this trait is not object safe._
## Implementors§
Source§
### impl<T> FromStrKey for T
where Self: MiniscriptKey + FromStr, <Self as MiniscriptKey>::Sha256: FromStr, Self::Hash256: FromStr, Self::Ripemd160: FromStr, Self::Hash160: FromStr, <Self as FromStr>::Err: Debug + Display, <<Self as MiniscriptKey>::Sha256 as FromStr>::Err: Debug + Display, <Self::Hash256 as FromStr>::Err: Debug + Display, <Self::Ripemd160 as FromStr>::Err: Debug + Display, <Self::Hash160 as FromStr>::Err: Debug + Display,
Source§
#### type _Sha256 = <T as MiniscriptKey>::Sha256
Source§
#### type _Sha256FromStrErr = <<T as MiniscriptKey>::Sha256 as FromStr>::Err
Source§
#### type _Hash256 = <T as MiniscriptKey>::Hash256
Source§
#### type _Hash256FromStrErr = <<T as MiniscriptKey>::Hash256 as FromStr>::Err
Source§
#### type _Ripemd160 = <T as MiniscriptKey>::Ripemd160
Source§
#### type _Ripemd160FromStrErr = <<T as MiniscriptKey>::Ripemd160 as FromStr>::Err
Source§
#### type _Hash160 = <T as MiniscriptKey>::Hash160
Source§
#### type _Hash160FromStrErr = <<T as MiniscriptKey>::Hash160 as FromStr>::Err
Source§
#### type _FromStrErr = <T as FromStr>::Err
