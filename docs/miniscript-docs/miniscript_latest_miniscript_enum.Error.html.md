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
# Enum ErrorCopy item path
Settings
Help
SummarySource
```
pub enum Error {
Show 37 variants  InvalidOpcode(Opcode),
  NonMinimalVerify(String),
  InvalidPush(Vec<u8>),
  Script(Error),
  AddrError(ParseError),
  AddrP2shError(P2shError),
  CmsTooManyKeys(u32),
  MultiATooManyKeys(u64),
  Unprintable(u8),
  ExpectedChar(char),
  UnexpectedStart,
  Unexpected(String),
  MultiColon(String),
  AtOutsideOr(String),
  UnknownWrapper(char),
  NonTopLevel(String),
  Trailing(String),
  MissingSig(PublicKey),
  CouldNotSatisfy,
  TypeCheck(String),
  BadDescriptor(String),
  Secp(Error),
  PolicyError(PolicyError),
  LiftError(LiftError),
  ContextError(ScriptContextError),
  MaxRecursiveDepthExceeded,
  NonStandardBareScript,
  AnalysisError(AnalysisError),
  ImpossibleSatisfaction,
  BareDescriptorAddr,
  PubKeyCtxError(KeyParseError, &'static str),
  TrNoScriptCode,
  MultipathDescLenMismatch,
  AbsoluteLockTime(AbsLockTimeError),
  RelativeLockTime(RelLockTimeError),
  Threshold(ThresholdError),
  ParseThreshold(ParseThresholdError),
}
```
Expand description
Miniscript
## Variants§
§
### InvalidOpcode(Opcode)
Opcode appeared which is not part of the script subset
§
### NonMinimalVerify(String)
Some opcode occurred followed by `OP_VERIFY` when it had a `VERIFY` version that should have been used instead
§
### InvalidPush(Vec<u8>)
Push was illegal in some context
§
### Script(Error)
rust-bitcoin script error
§
### AddrError(ParseError)
rust-bitcoin address error
§
### AddrP2shError(P2shError)
rust-bitcoin p2sh address error
§
### CmsTooManyKeys(u32)
A `CHECKMULTISIG` opcode was preceded by a number > 20
§
### MultiATooManyKeys(u64)
A tapscript multi_a cannot support more than Weight::MAX_BLOCK/32 keys
§
### Unprintable(u8)
Encountered unprintable character in descriptor
§
### ExpectedChar(char)
expected character while parsing descriptor; didn’t find one
§
### UnexpectedStart
While parsing backward, hit beginning of script
§
### Unexpected(String)
Got something we were not expecting
§
### MultiColon(String)
Name of a fragment contained `:` multiple times
§
### AtOutsideOr(String)
Name of a fragment contained `@` but we were not parsing an OR
§
### UnknownWrapper(char)
Encountered a wrapping character that we don’t recognize
§
### NonTopLevel(String)
Parsed a miniscript and the result was not of type T
§
### Trailing(String)
Parsed a miniscript but there were more script opcodes after it
§
### MissingSig(PublicKey)
Could not satisfy a script (fragment) because of a missing signature
§
### CouldNotSatisfy
General failure to satisfy
§
### TypeCheck(String)
Typechecking failed
§
### BadDescriptor(String)
General error in creating descriptor
§
### Secp(Error)
Forward-secp related errors
§
### PolicyError(PolicyError)
Errors related to policy
§
### LiftError(LiftError)
Errors related to lifting
§
### ContextError(ScriptContextError)
Forward script context related errors
§
### MaxRecursiveDepthExceeded
Recursion depth exceeded when parsing policy/miniscript from string
§
### NonStandardBareScript
Anything but c:pk(key) (P2PK), c:pk_h(key) (P2PKH), and thresh_m(k,…) up to n=3 is invalid by standardness (bare)
§
### AnalysisError(AnalysisError)
Analysis Error
§
### ImpossibleSatisfaction
Miniscript is equivalent to false. No possible satisfaction
§
### BareDescriptorAddr
Bare descriptors don’t have any addresses
§
### PubKeyCtxError(KeyParseError, &'static str)
PubKey invalid under current context
§
### TrNoScriptCode
No script code for Tr descriptors
§
### MultipathDescLenMismatch
At least two BIP389 key expressions in the descriptor contain tuples of derivation indexes of different lengths.
§
### AbsoluteLockTime(AbsLockTimeError)
Invalid absolute locktime
§
### RelativeLockTime(RelLockTimeError)
Invalid absolute locktime
§
### Threshold(ThresholdError)
Invalid threshold.
§
### ParseThreshold(ParseThresholdError)
Invalid threshold.
## Trait Implementations§
Source§
### impl Debug for Error
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Display for Error
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Error for Error
Source§
#### fn cause(&self) -> Option<&dyn Error>
👎Deprecated since 1.33.0: replaced by Error::source, which can support downcasting
1.30.0 · Source§
#### fn source(&self) -> Option<&(dyn Error + 'static)>
Returns the lower-level source of this error, if any. Read more
1.0.0 · Source§
#### fn description(&self) -> &str
👎Deprecated since 1.42.0: use the Display impl or to_string()
Read more
Source§
#### fn provide<'a>(&'a self, request: &mut Request<'a>)
🔬This is a nightly-only experimental API. (`error_generic_member_access`)
Provides type-based access to context intended for error reports. Read more
Source§
### impl PartialEq for Error
Source§
#### fn eq(&self, other: &Error) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl StructuralPartialEq for Error
## Auto Trait Implementations§
§
### impl Freeze for Error
§
### impl RefUnwindSafe for Error
§
### impl Send for Error
§
### impl Sync for Error
§
### impl Unpin for Error
§
### impl UnwindSafe for Error
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
