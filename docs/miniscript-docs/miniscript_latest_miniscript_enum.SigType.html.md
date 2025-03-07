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
# Enum SigTypeCopy item path
Settings
Help
SummarySource
```
pub enum SigType {
  Ecdsa,
  Schnorr,
}
```
Expand description
Signature algorithm type
## Variants§
§
### Ecdsa
Ecdsa signature
§
### Schnorr
Schnorr Signature
## Trait Implementations§
Source§
### impl Clone for SigType
Source§
#### fn clone(&self) -> SigType
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl Debug for SigType
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Hash for SigType
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl Ord for SigType
Source§
#### fn cmp(&self, other: &SigType) -> Ordering
This method returns an `Ordering` between `self` and `other`. Read more
1.21.0 · Source§
#### fn max(self, other: Self) -> Self
where Self: Sized,
Compares and returns the maximum of two values. Read more
1.21.0 · Source§
#### fn min(self, other: Self) -> Self
where Self: Sized,
Compares and returns the minimum of two values. Read more
1.50.0 · Source§
#### fn clamp(self, min: Self, max: Self) -> Self
where Self: Sized,
Restrict a value to a certain interval. Read more
Source§
### impl PartialEq for SigType
Source§
#### fn eq(&self, other: &SigType) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl PartialOrd for SigType
Source§
#### fn partial_cmp(&self, other: &SigType) -> Option<Ordering>
This method returns an ordering between `self` and `other` values if one exists. Read more
1.0.0 · Source§
#### fn lt(&self, other: &Rhs) -> bool
Tests less than (for `self` and `other`) and is used by the `<` operator. Read more
1.0.0 · Source§
#### fn le(&self, other: &Rhs) -> bool
Tests less than or equal to (for `self` and `other`) and is used by the `<=` operator. Read more
1.0.0 · Source§
#### fn gt(&self, other: &Rhs) -> bool
Tests greater than (for `self` and `other`) and is used by the `>` operator. Read more
1.0.0 · Source§
#### fn ge(&self, other: &Rhs) -> bool
Tests greater than or equal to (for `self` and `other`) and is used by the `>=` operator. Read more
Source§
### impl Copy for SigType
Source§
### impl Eq for SigType
Source§
### impl StructuralPartialEq for SigType
## Auto Trait Implementations§
§
### impl Freeze for SigType
§
### impl RefUnwindSafe for SigType
§
### impl Send for SigType
§
### impl Sync for SigType
§
### impl Unpin for SigType
§
### impl UnwindSafe for SigType
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
### impl<T> CloneToUninit for T
where T: Clone,
Source§
#### unsafe fn clone_to_uninit(&self, dst: *mut u8)
🔬This is a nightly-only experimental API. (`clone_to_uninit`)
Performs copy-assignment from `self` to `dst`. Read more
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
### impl<T> ToOwned for T
where T: Clone,
Source§
#### type Owned = T
The resulting type after obtaining ownership.
Source§
#### fn to_owned(&self) -> T
Creates owned data from borrowed data, usually by cloning. Read more
Source§
#### fn clone_into(&self, target: &mut T)
Uses borrowed data to replace owned data, usually by cloning. Read more
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
