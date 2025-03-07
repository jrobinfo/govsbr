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


miniscript::interpreter
# Struct InterpreterCopy item path
Settings
Help
SummarySource
```
pub struct Interpreter<'txin> { /* private fields */ }
```
Expand description
An iterable Miniscript-structured representation of the spending of a coin
## Implementations§
Source§
### impl<'txin> Interpreter<'txin>
Source
#### pub fn from_txdata( spk: &ScriptBuf, script_sig: &'txin Script, witness: &'txin Witness, sequence: Sequence, lock_time: LockTime, ) -> Result<Self, Error>
Constructs an interpreter from the data of a spending transaction
Accepts a signature-validating function. If you are willing to trust that ECSDA signatures are valid, this can be set to the constant true function; otherwise, it should be a closure containing a sighash and secp context, which can actually verify a given signature.
Source
#### pub fn iter_custom<'iter>( &'iter self, verify_sig: Box<dyn FnMut(&KeySigPair) -> bool + 'iter>, ) -> Iter<'txin, 'iter> ⓘ
Same as `Interpreter::iter`, but allows for a custom verification function. See Self::iter_assume_sigs for a simpler API without information about Prevouts but skips the signature verification
Source
#### pub fn verify_sig<C: Verification, T: Borrow<TxOut>>( &self, secp: &Secp256k1<C>, tx: &Transaction, input_idx: usize, prevouts: &Prevouts<'_, T>, sig: &KeySigPair, ) -> bool
Verify a signature for a given transaction and prevout information This is a low level API, `Interpreter::iter` or `Interpreter::iter_assume_sigs` should satisfy most use-cases. Returns false if
  * the signature verification fails
  * the input index is out of range
  * Insufficient sighash information is present
  * sighash single without corresponding output


Source
#### pub fn iter<'iter, C: Verification, T: Borrow<TxOut>>( &'iter self, secp: &'iter Secp256k1<C>, tx: &'txin Transaction, input_idx: usize, prevouts: &'iter Prevouts<'_, T>, ) -> Iter<'txin, 'iter> ⓘ
Creates an iterator over the satisfied spending conditions
Returns all satisfied constraints, even if they were redundant (i.e. did not contribute to the script being satisfied). For example, if a signature were provided for an `and_b(Pk,false)` fragment, that signature will be returned, even though the entire and_b must have failed and must not have been used.
In case the script is actually dissatisfied, this may return several values before ultimately returning an error.
Not all fields are used by legacy/segwitv0 descriptors; if you are sure this is a legacy spend (you can check with the `is_legacy\is_segwitv0` method) you can provide dummy data for the amount/prevouts.
  * For legacy outputs, no information about prevouts is required
  * For segwitv0 outputs, prevout at corresponding index with correct amount must be provided
  * For taproot outputs, information about all prevouts must be supplied


Source
#### pub fn iter_assume_sigs<'iter>(&'iter self) -> Iter<'txin, 'iter> ⓘ
Creates an iterator over the satisfied spending conditions without checking signatures
Source
#### pub fn inferred_descriptor_string(&self) -> String
Outputs a “descriptor” string which reproduces the spent coins
This may not represent the original descriptor used to produce the transaction, since it cannot distinguish between sorted and unsorted multisigs (and anyway it can only see the final keys, keyorigin info is lost in serializing to Bitcoin).
If you are using the interpreter as a sanity check on a transaction, it is worthwhile to try to parse this as a descriptor using `from_str` which will check standardness and consensus limits, which the interpreter does not do on its own. Or use the `inferred_descriptor` method which does this for you.
Source
#### pub fn is_legacy(&self) -> bool
Whether this is a pre-segwit spend
Source
#### pub fn is_segwit_v0(&self) -> bool
Whether this is a segwit v0 spend (wrapped or native)
Source
#### pub fn is_taproot_v1_key_spend(&self) -> bool
Whether this is a taproot key spend
Source
#### pub fn is_taproot_v1_script_spend(&self) -> bool
Whether this is a taproot script spend
Source
#### pub fn sig_type(&self) -> SigType
Signature type of the spend
Source
#### pub fn inferred_descriptor(&self) -> Result<Descriptor<PublicKey>, Error>
Outputs a “descriptor” which reproduces the spent coins
This may not represent the original descriptor used to produce the transaction, since it cannot distinguish between sorted and unsorted multisigs (and anyway it can only see the final keys, keyorigin info is lost in serializing to Bitcoin). x-only keys are translated to `bitcoin::PublicKey` with 0x02 prefix.
## Auto Trait Implementations§
§
### impl<'txin> Freeze for Interpreter<'txin>
§
### impl<'txin> RefUnwindSafe for Interpreter<'txin>
§
### impl<'txin> Send for Interpreter<'txin>
§
### impl<'txin> Sync for Interpreter<'txin>
§
### impl<'txin> Unpin for Interpreter<'txin>
§
### impl<'txin> UnwindSafe for Interpreter<'txin>
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
