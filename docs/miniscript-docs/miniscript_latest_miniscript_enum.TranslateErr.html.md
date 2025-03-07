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
# Enum TranslateErrCopy item path
Settings
Help
SummarySource
```
pub enum TranslateErr<E> {
  TranslatorErr(E),
  OuterError(Error),
}
```
Expand description
An enum for representing translation errors
## Variants§
§
### TranslatorErr(E)
Error inside in the underlying key translation
§
### OuterError(Error)
Error in the final translated structure. In some cases, the translated structure might not be valid under the given context. For example, translating from string keys to x-only keys in wsh descriptors.
## Implementations§
Source§
### impl<E> TranslateErr<E>
Source
#### pub fn expect_translator_err(self, msg: &str) -> E
Enum used to capture errors from the `Translator` trait as well as context errors from the translated structure. The errors occurred in translation are captured in the `TranslateErr::TranslatorErr` while the errors in the translated structure are captured in the `TranslateErr::OuterError`
As of taproot upgrade: The following rules apply to the translation of descriptors:
  * Legacy/Bare does not allow x_only keys
  * SegwitV0 does not allow uncompressed keys and x_only keys
  * Tapscript does not allow uncompressed keys
  * Translating into multi-path descriptors should have same number of path for all the keys in the descriptor


##### §Panics
This function will panic if the Error is OutError.
## Trait Implementations§
Source§
### impl<E: Debug> Debug for TranslateErr<E>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<E> From<E> for TranslateErr<E>
Source§
#### fn from(v: E) -> Self
Converts to this type from the input type.
## Auto Trait Implementations§
§
### impl<E> Freeze for TranslateErr<E>
where E: Freeze,
§
### impl<E> RefUnwindSafe for TranslateErr<E>
where E: RefUnwindSafe,
§
### impl<E> Send for TranslateErr<E>
where E: Send,
§
### impl<E> Sync for TranslateErr<E>
where E: Sync,
§
### impl<E> Unpin for TranslateErr<E>
where E: Unpin,
§
### impl<E> UnwindSafe for TranslateErr<E>
where E: UnwindSafe,
## Blanket Implementations§
Source§
### impl<T> Any for T
where T: 'static + ?Sized,
Source§
#### fn type_id(&self) -> TypeId
Gets the `TypeId` of `self`. Read more
Source§
### impl<T> Borrow<T> for T
where T: ?Sized,
Source§
#### fn borrow(&self) -> &T
Immutably borrows from an owned value. Read more
Source§
### impl<T> BorrowMut<T> for T
where T: ?Sized,
Source§
#### fn borrow_mut(&mut self) -> &mut T
Mutably borrows from an owned value. Read more
Source§
### impl<T> From<!> for T
Source§
#### fn from(t: !) -> T
Converts to this type from the input type.
Source§
### impl<T> From<T> for T
Source§
#### fn from(t: T) -> T
Returns the argument unchanged.
Source§
### impl<T, U> Into<U> for T
where U: From<T>,
Source§
#### fn into(self) -> U
Calls `U::from(self)`.
That is, this conversion is whatever the implementation of `From<T> for U` chooses to do.
Source§
### impl<T, U> TryFrom<U> for T
where U: Into<T>,
Source§
#### type Error = Infallible
The type returned in the event of a conversion error.
Source§
#### fn try_from(value: U) -> Result<T, <T as TryFrom<U>>::Error>
Performs the conversion.
Source§
### impl<T, U> TryInto<U> for T
where U: TryFrom<T>,
Source§
#### type Error = <U as TryFrom<T>>::Error
The type returned in the event of a conversion error.
Source§
#### fn try_into(self) -> Result<U, <U as TryFrom<T>>::Error>
Performs the conversion.
Source§
### impl<V, T> VZip<V> for T
where V: MultiLane<T>,
Source§
#### fn vzip(self) -> V
