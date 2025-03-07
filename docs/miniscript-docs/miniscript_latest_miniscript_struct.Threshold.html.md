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
# Struct ThresholdCopy item path
Settings
Help
SummarySource
```
pub struct Threshold<T, const MAX: usize> { /* private fields */ }
```
Expand description
Structure representing a k-of-n threshold collection of some arbitrary object `T`.
If the constant parameter `MAX` is nonzero, it represents a cap on the `n` value; if `n` exceeds `MAX` then an error is returned on construction.
## Implementations§
Source§
### impl<T, const MAX: usize> Threshold<T, MAX>
Source
#### pub fn new(k: usize, inner: Vec<T>) -> Result<Self, ThresholdError>
Constructs a threshold directly from a threshold value and collection.
Source
#### pub fn from_iter<I: Iterator<Item = T>>( k: usize, iter: I, ) -> Result<Self, ThresholdError>
Constructs a threshold from a threshold value and an iterator that yields collection elements.
Source
#### pub fn or(left: T, right: T) -> Self
Constructor for an “or” represented as a 1-of-2 threshold.
Source
#### pub fn and(left: T, right: T) -> Self
Constructor for an “and” represented as a 2-of-2 threshold.
Source
#### pub fn is_or(&self) -> bool
Whether this threshold is a 1-of-n.
Source
#### pub fn is_and(&self) -> bool
Whether this threshold is a n-of-n.
Source
#### pub fn set_maximum<const NEWMAX: usize>( self, ) -> Result<Threshold<T, NEWMAX>, ThresholdError>
Changes the type-system-enforced maximum value of the threshold.
Source
#### pub fn forget_maximum(self) -> Threshold<T, 0>
Forgets the type-system-enforced maximum value of the threshold.
Source
#### pub fn map<U, F: FnMut(T) -> U>(self, mapfn: F) -> Threshold<U, MAX>
Constructs a threshold from an existing threshold by applying a mapping function to each individual item.
Source
#### pub fn map_ref<U, F: FnMut(&T) -> U>(&self, mapfn: F) -> Threshold<U, MAX>
Like `Self::map` but takes a reference to the threshold rather than taking ownership.
Source
#### pub fn translate<U, F, FuncError>( self, translatefn: F, ) -> Result<Threshold<U, MAX>, FuncError>
where F: FnMut(T) -> Result<U, FuncError>,
Like `Self::map` except that the mapping function may return an error.
Source
#### pub fn translate_ref<U, F, FuncError>( &self, translatefn: F, ) -> Result<Threshold<U, MAX>, FuncError>
where F: FnMut(&T) -> Result<U, FuncError>,
Like `Self::translate` but takes a reference to the threshold rather than taking ownership.
Source
#### pub fn translate_by_index<U, F, FuncError>( &self, translatefn: F, ) -> Result<Threshold<U, MAX>, FuncError>
where F: FnMut(usize) -> Result<U, FuncError>,
Like `Self::translate_ref` but passes indices to the closure rather than internal data.
This is useful in situations where the data to be translated exists outside of the threshold itself, and the threshold data is irrelevant. In particular it is commonly paired with `crate::expression::Tree::to_null_threshold`.
If the data to be translated comes from a post-order iterator, you may instead want `Self::map_from_post_order_iter`.
Source
#### pub fn map_from_post_order_iter<U: Clone>( &self, child_indices: &[usize], processed: &[U], ) -> Threshold<U, MAX>
Construct a threshold from an existing threshold which has been processed in some way.
It is a common pattern in this library to transform data structures by running a post-order iterator over them, putting processed elements into a vector to be later referenced by their parents.
This function encapsulates that pattern by taking the child-index vector of the`PostOrderIterItem`, under consideration, and the vector of processed elements.
Source
#### pub fn n(&self) -> usize
Accessor for the number of elements in the threshold.
Source
#### pub const fn k(&self) -> usize
Accessor for the threshold value.
Source
#### pub fn data(&self) -> &[T]
Accessor for the underlying data.
Source
#### pub fn data_mut(&mut self) -> &mut [T]
Mutable accessor for the underlying data.
This returns access to the underlying data as a mutable slice, which allows you to modify individual elements. To change the number of elements, you must destructure the threshold with `Self::k` and `Self::into_data` and reconstruct it (and on reconstruction, deal with any errors caused by your tinkering with the threshold values).
Source
#### pub fn into_data(self) -> Vec<T>
Accessor for the underlying data.
Source
#### pub fn iter(&self) -> Iter<'_, T> ⓘ
Passthrough to an iterator on the underlying vector.
Source§
### impl<T> Threshold<T, 0>
Source
#### pub fn or_n(inner: Vec<T>) -> Self
Constructor for an “or” represented as a 1-of-n threshold.
##### §Panics
Panics if the passed vector is empty.
Source
#### pub fn and_n(inner: Vec<T>) -> Self
Constructor for an “and” represented as a n-of-n threshold.
##### §Panics
Panics if the passed vector is empty.
Source§
### impl<T: Display, const MAX: usize> Threshold<T, MAX>
Source
#### pub fn display<'s>(&'s self, name: &'s str, show_k: bool) -> impl Display + 's
Produces an object which can `fmt::Display` the threshold.
Source§
### impl<T: Debug, const MAX: usize> Threshold<T, MAX>
Source
#### pub fn debug<'s>(&'s self, name: &'s str, show_k: bool) -> impl Debug + 's
Produces an object which can `fmt::Debug` the threshold.
## Trait Implementations§
Source§
### impl<T: Clone, const MAX: usize> Clone for Threshold<T, MAX>
Source§
#### fn clone(&self) -> Threshold<T, MAX>
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl<T: Debug, const MAX: usize> Debug for Threshold<T, MAX>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<T: Hash, const MAX: usize> Hash for Threshold<T, MAX>
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl<T, const MAX: usize> IntoIterator for Threshold<T, MAX>
Source§
#### type Item = T
The type of the elements being iterated over.
Source§
#### type IntoIter = IntoIter<T>
Which kind of iterator are we turning this into?
Source§
#### fn into_iter(self) -> Self::IntoIter
Creates an iterator from a value. Read more
Source§
### impl<T: Ord, const MAX: usize> Ord for Threshold<T, MAX>
Source§
#### fn cmp(&self, other: &Threshold<T, MAX>) -> Ordering
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
### impl<T: PartialEq, const MAX: usize> PartialEq for Threshold<T, MAX>
Source§
#### fn eq(&self, other: &Threshold<T, MAX>) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl<T: PartialOrd, const MAX: usize> PartialOrd for Threshold<T, MAX>
Source§
#### fn partial_cmp(&self, other: &Threshold<T, MAX>) -> Option<Ordering>
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
### impl<T: Eq, const MAX: usize> Eq for Threshold<T, MAX>
Source§
### impl<T, const MAX: usize> StructuralPartialEq for Threshold<T, MAX>
## Auto Trait Implementations§
§
### impl<T, const MAX: usize> Freeze for Threshold<T, MAX>
§
### impl<T, const MAX: usize> RefUnwindSafe for Threshold<T, MAX>
where T: RefUnwindSafe,
§
### impl<T, const MAX: usize> Send for Threshold<T, MAX>
where T: Send,
§
### impl<T, const MAX: usize> Sync for Threshold<T, MAX>
where T: Sync,
§
### impl<T, const MAX: usize> Unpin for Threshold<T, MAX>
where T: Unpin,
§
### impl<T, const MAX: usize> UnwindSafe for Threshold<T, MAX>
where T: UnwindSafe,
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
