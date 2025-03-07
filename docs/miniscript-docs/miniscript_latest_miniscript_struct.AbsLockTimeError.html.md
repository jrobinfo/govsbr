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
# Struct AbsLockTimeErrorCopy item path
Settings
Help
SummarySource
```
pub struct AbsLockTimeError { /* private fields */ }
```
Expand description
Error parsing an absolute locktime.
## Trait Implementations§
Source§
### impl Debug for AbsLockTimeError
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Display for AbsLockTimeError
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Error for AbsLockTimeError
Source§
#### fn source(&self) -> Option<&(dyn Error + 'static)>
Returns the lower-level source of this error, if any. Read more
1.0.0 · Source§
#### fn description(&self) -> &str
👎Deprecated since 1.42.0: use the Display impl or to_string()
Read more
1.0.0 · Source§
#### fn cause(&self) -> Option<&dyn Error>
👎Deprecated since 1.33.0: replaced by Error::source, which can support downcasting
Source§
#### fn provide<'a>(&'a self, request: &mut Request<'a>)
🔬This is a nightly-only experimental API. (`error_generic_member_access`)
Provides type-based access to context intended for error reports. Read more
Source§
### impl PartialEq for AbsLockTimeError
Source§
#### fn eq(&self, other: &AbsLockTimeError) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl StructuralPartialEq for AbsLockTimeError
## Auto Trait Implementations§
§
### impl Freeze for AbsLockTimeError
§
### impl RefUnwindSafe for AbsLockTimeError
§
### impl Send for AbsLockTimeError
§
### impl Sync for AbsLockTimeError
§
### impl Unpin for AbsLockTimeError
§
### impl UnwindSafe for AbsLockTimeError
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
### impl<T> ToString for T
where T: Display + ?Sized,
Source§
#### fn to_string(&self) -> String
Converts the given value to a `String`. Read more
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
