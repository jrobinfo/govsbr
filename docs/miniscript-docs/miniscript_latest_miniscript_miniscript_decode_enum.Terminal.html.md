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


miniscript::miniscript::decode
# Enum TerminalCopy item path
Settings
Help
SummarySource
```
pub enum Terminal<Pk: MiniscriptKey, Ctx: ScriptContext> {
Show 28 variants  True,
  False,
  PkK(Pk),
  PkH(Pk),
  RawPkH(Hash),
  After(AbsLockTime),
  Older(RelLockTime),
  Sha256(Pk::Sha256),
  Hash256(Pk::Hash256),
  Ripemd160(Pk::Ripemd160),
  Hash160(Pk::Hash160),
  Alt(Arc<Miniscript<Pk, Ctx>>),
  Swap(Arc<Miniscript<Pk, Ctx>>),
  Check(Arc<Miniscript<Pk, Ctx>>),
  DupIf(Arc<Miniscript<Pk, Ctx>>),
  Verify(Arc<Miniscript<Pk, Ctx>>),
  NonZero(Arc<Miniscript<Pk, Ctx>>),
  ZeroNotEqual(Arc<Miniscript<Pk, Ctx>>),
  AndV(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>),
  AndB(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>),
  AndOr(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>),
  OrB(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>),
  OrD(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>),
  OrC(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>),
  OrI(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>),
  Thresh(Threshold<Arc<Miniscript<Pk, Ctx>>, 0>),
  Multi(Threshold<Pk, MAX_PUBKEYS_PER_MULTISIG>),
  MultiA(Threshold<Pk, MAX_PUBKEYS_IN_CHECKSIGADD>),
}
```
Expand description
All AST elements.
This variant is the inner Miniscript variant that allows the user to bypass some of the miniscript rules. You should _never_ construct `Terminal` directly. This is only exposed to external users to allow matching on the `Miniscript`.
The average user should always use the `Descriptor` APIs. Advanced users who want deal with Miniscript ASTs should use the `Miniscript` APIs.
## Variants§
§
### True
`1`
§
### False
`0`
§
### PkK(Pk)
`<key>`
§
### PkH(Pk)
`DUP HASH160 <keyhash> EQUALVERIFY`
§
### RawPkH(Hash)
Only for parsing PkH for Script. These raw descriptors are not yet specified in miniscript. We only this variant internally for inferring miniscripts from raw Scripts. It is not possible to construct this variant from any of the Miniscript APIs. We don’t have a generic over here because we don’t want to user to have any abstract reasoning over raw descriptors.
§
### After(AbsLockTime)
`n CHECKLOCKTIMEVERIFY`
§
### Older(RelLockTime)
`n CHECKSEQUENCEVERIFY`
§
### Sha256(Pk::Sha256)
`SIZE 32 EQUALVERIFY SHA256 <hash> EQUAL`
§
### Hash256(Pk::Hash256)
`SIZE 32 EQUALVERIFY HASH256 <hash> EQUAL`
§
### Ripemd160(Pk::Ripemd160)
`SIZE 32 EQUALVERIFY RIPEMD160 <hash> EQUAL`
§
### Hash160(Pk::Hash160)
`SIZE 32 EQUALVERIFY HASH160 <hash> EQUAL`
§
### Alt(Arc<Miniscript<Pk, Ctx>>)
`TOALTSTACK [E] FROMALTSTACK`
§
### Swap(Arc<Miniscript<Pk, Ctx>>)
`SWAP [E1]`
§
### Check(Arc<Miniscript<Pk, Ctx>>)
`[Kt]/[Ke] CHECKSIG`
§
### DupIf(Arc<Miniscript<Pk, Ctx>>)
`DUP IF [V] ENDIF`
§
### Verify(Arc<Miniscript<Pk, Ctx>>)
`[T] VERIFY`
§
### NonZero(Arc<Miniscript<Pk, Ctx>>)
`SIZE 0NOTEQUAL IF [Fn] ENDIF`
§
### ZeroNotEqual(Arc<Miniscript<Pk, Ctx>>)
`[X] 0NOTEQUAL`
§
### AndV(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>)
`[V] [T]/[V]/[F]/[Kt]`
§
### AndB(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>)
`[E] [W] BOOLAND`
§
### AndOr(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>)
`[various] NOTIF [various] ELSE [various] ENDIF`
§
### OrB(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>)
`[E] [W] BOOLOR`
§
### OrD(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>)
`[E] IFDUP NOTIF [T]/[E] ENDIF`
§
### OrC(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>)
`[E] NOTIF [V] ENDIF`
§
### OrI(Arc<Miniscript<Pk, Ctx>>, Arc<Miniscript<Pk, Ctx>>)
`IF [various] ELSE [various] ENDIF`
§
### Thresh(Threshold<Arc<Miniscript<Pk, Ctx>>, 0>)
`[E] ([W] ADD)* k EQUAL`
§
### Multi(Threshold<Pk, MAX_PUBKEYS_PER_MULTISIG>)
`k (<key>)* n CHECKMULTISIG`
§
### MultiA(Threshold<Pk, MAX_PUBKEYS_IN_CHECKSIGADD>)
`<key> CHECKSIG (<key> CHECKSIGADD)*(n-1) k NUMEQUAL`
## Implementations§
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Terminal<Pk, Ctx>
Source
#### pub fn encode(&self, builder: Builder) -> Builder
where Pk: ToPublicKey,
Encode the element as a fragment of Bitcoin Script. The inverse function, from Script to an AST element, is implemented in the `parse` module.
## Trait Implementations§
Source§
### impl<Pk: Clone + MiniscriptKey, Ctx: Clone + ScriptContext> Clone for Terminal<Pk, Ctx>
where Pk::Sha256: Clone, Pk::Hash256: Clone, Pk::Ripemd160: Clone, Pk::Hash160: Clone,
Source§
#### fn clone(&self) -> Terminal<Pk, Ctx>
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Debug for Terminal<Pk, Ctx>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Display for Terminal<Pk, Ctx>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<Pk: FromStrKey, Ctx: ScriptContext> FromTree for Terminal<Pk, Ctx>
Source§
#### fn from_tree(top: &Tree<'_>) -> Result<Terminal<Pk, Ctx>, Error>
Extract a structure from Tree representation
Source§
### impl<Pk: Hash + MiniscriptKey, Ctx: Hash + ScriptContext> Hash for Terminal<Pk, Ctx>
where Pk::Sha256: Hash, Pk::Hash256: Hash, Pk::Ripemd160: Hash, Pk::Hash160: Hash,
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Liftable<Pk> for Terminal<Pk, Ctx>
Source§
#### fn lift(&self) -> Result<Semantic<Pk>, Error>
Converts this object into an abstract policy.
Source§
### impl<Pk: Ord + MiniscriptKey, Ctx: Ord + ScriptContext> Ord for Terminal<Pk, Ctx>
where Pk::Sha256: Ord, Pk::Hash256: Ord, Pk::Ripemd160: Ord, Pk::Hash160: Ord,
Source§
#### fn cmp(&self, other: &Terminal<Pk, Ctx>) -> Ordering
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
### impl<Pk: PartialEq + MiniscriptKey, Ctx: PartialEq + ScriptContext> PartialEq for Terminal<Pk, Ctx>
where Pk::Sha256: PartialEq, Pk::Hash256: PartialEq, Pk::Ripemd160: PartialEq, Pk::Hash160: PartialEq,
Source§
#### fn eq(&self, other: &Terminal<Pk, Ctx>) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl<Pk: PartialOrd + MiniscriptKey, Ctx: PartialOrd + ScriptContext> PartialOrd for Terminal<Pk, Ctx>
where Pk::Sha256: PartialOrd, Pk::Hash256: PartialOrd, Pk::Ripemd160: PartialOrd, Pk::Hash160: PartialOrd,
Source§
#### fn partial_cmp(&self, other: &Terminal<Pk, Ctx>) -> Option<Ordering>
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
### impl<Pk: Eq + MiniscriptKey, Ctx: Eq + ScriptContext> Eq for Terminal<Pk, Ctx>
where Pk::Sha256: Eq, Pk::Hash256: Eq, Pk::Ripemd160: Eq, Pk::Hash160: Eq,
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> StructuralPartialEq for Terminal<Pk, Ctx>
## Auto Trait Implementations§
§
### impl<Pk, Ctx> Freeze for Terminal<Pk, Ctx>
where Pk: Freeze, <Pk as MiniscriptKey>::Sha256: Freeze, <Pk as MiniscriptKey>::Hash256: Freeze, <Pk as MiniscriptKey>::Ripemd160: Freeze, <Pk as MiniscriptKey>::Hash160: Freeze,
§
### impl<Pk, Ctx> RefUnwindSafe for Terminal<Pk, Ctx>
where Pk: RefUnwindSafe, <Pk as MiniscriptKey>::Sha256: RefUnwindSafe, <Pk as MiniscriptKey>::Hash256: RefUnwindSafe, <Pk as MiniscriptKey>::Ripemd160: RefUnwindSafe, <Pk as MiniscriptKey>::Hash160: RefUnwindSafe, Ctx: RefUnwindSafe,
§
### impl<Pk, Ctx> Send for Terminal<Pk, Ctx>
where Pk: Send + Sync, <Pk as MiniscriptKey>::Sha256: Send + Sync, <Pk as MiniscriptKey>::Hash256: Send + Sync, <Pk as MiniscriptKey>::Ripemd160: Send + Sync, <Pk as MiniscriptKey>::Hash160: Send + Sync, Ctx: Sync + Send,
§
### impl<Pk, Ctx> Sync for Terminal<Pk, Ctx>
where Pk: Sync + Send, <Pk as MiniscriptKey>::Sha256: Sync + Send, <Pk as MiniscriptKey>::Hash256: Sync + Send, <Pk as MiniscriptKey>::Ripemd160: Sync + Send, <Pk as MiniscriptKey>::Hash160: Sync + Send, Ctx: Sync + Send,
§
### impl<Pk, Ctx> Unpin for Terminal<Pk, Ctx>
where Pk: Unpin, <Pk as MiniscriptKey>::Sha256: Unpin, <Pk as MiniscriptKey>::Hash256: Unpin, <Pk as MiniscriptKey>::Ripemd160: Unpin, <Pk as MiniscriptKey>::Hash160: Unpin,
§
### impl<Pk, Ctx> UnwindSafe for Terminal<Pk, Ctx>
where Pk: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Sha256: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Hash256: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Ripemd160: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Hash160: UnwindSafe + RefUnwindSafe, Ctx: RefUnwindSafe,
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
