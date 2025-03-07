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
# Trait TranslatePkCopy item path
Settings
Help
SummarySource
```
pub trait TranslatePk<P, Q>
where
  P: MiniscriptKey,
  Q: MiniscriptKey,
{
  type Output;
  // Required method
  fn translate_pk<T, E>(
    &self,
    translator: &mut T,
  ) -> Result<Self::Output, TranslateErr<E>>
    where T: Translator<P, Q, E>;
}
```
Expand description
Converts a descriptor using abstract keys to one using specific keys. Uses translator `t` to do the actual translation function calls.
## Required Associated Types§
Source
#### type Output
The associated output type. This must be `Self<Q>`.
## Required Methods§
Source
#### fn translate_pk<T, E>( &self, translator: &mut T, ) -> Result<Self::Output, TranslateErr<E>>
where T: Translator<P, Q, E>,
Translates a struct from one generic to another where the translations for Pk are provided by the given `Translator`.
## Dyn Compatibility§
This trait is **not** dyn compatible.
_In older versions of Rust, dyn compatibility was called "object safety", so this trait is not object safe._
## Implementors§
Source§
### impl<P, Q> TranslatePk<P, Q> for Descriptor<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### type Output = Descriptor<Q>
Source§
### impl<P, Q> TranslatePk<P, Q> for Bare<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### type Output = Bare<Q>
Source§
### impl<P, Q> TranslatePk<P, Q> for Pkh<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### type Output = Pkh<Q>
Source§
### impl<P, Q> TranslatePk<P, Q> for Sh<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### type Output = Sh<Q>
Source§
### impl<P, Q> TranslatePk<P, Q> for Tr<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### type Output = Tr<Q>
Source§
### impl<P, Q> TranslatePk<P, Q> for Wpkh<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### type Output = Wpkh<Q>
Source§
### impl<P, Q> TranslatePk<P, Q> for Wsh<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### type Output = Wsh<Q>
Source§
### impl<Pk, Q, Ctx> TranslatePk<Pk, Q> for Miniscript<Pk, Ctx>
where Pk: MiniscriptKey, Q: MiniscriptKey, Ctx: ScriptContext,
Source§
#### type Output = Miniscript<Q, Ctx>
