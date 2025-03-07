Docs.rs
  * bech32-0.11.0
    * bech32 0.11.0 
    * Docs.rs crate page 
    * MIT
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * clarkmoody 
    * TheBlueMatt 
    * Dependencies
    * Versions
    * **100%** of the crate is documented 
  * Platform
    * i686-pc-windows-msvc
    * i686-unknown-linux-gnu
    * x86_64-apple-darwin
    * x86_64-pc-windows-msvc
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


# Crate bech32Copy item path
Settings
Help
SummarySource
Expand description
Encoding and decoding of the Bech32 format.
Bech32 is an encoding scheme that is easy to use for humans and efficient to encode in QR codes.
A Bech32 string consists of a human-readable part (HRP), a separator (the character `'1'`), and a data part. A checksum at the end of the string provides error detection to prevent mistakes when the string is written off or read out loud.
## §Usage
  * If you are doing segwit stuff you likely want to use the `segwit` API.
  * Non-segwit stuff and you have an allocator, use the top level API. For normal usage the `encode` and `decode` functions should suffice. There are also various other functions for explicit control of the checksum algorithm and the case used when encoding.
  * Non-segwit stuff and you do _not_ have an allocator, use the `CheckedHrpstring` type for decoding. For encoding we provide various top level functions of the form `encode*_to_fmt`.
  * To define your own checksum algorithm implement `Checksum` (see example below).


The original description in BIP-173 has more details. See also BIP-350.
## §Deviation from spec
We do not enforce the 90 character limit specified by BIP-173, instead we enforce the code length for the respective checksum algorithm (see `Checksum::CODE_LENGTH`). We do however enforce the 90 character limit within the `segwit` modules and types.
## §Examples
### §Encoding
```
use bech32::{hrp, segwit, Hrp, Bech32m};
const DATA: [u8; 20] = [0xab; 20]; // Arbitrary data to be encoded.
const STRING: &str = "abc14w46h2at4w46h2at4w46h2at4w46h2at958ngu";
const TAP_ADDR: &str = "bc1p4w46h2at4w46h2at4w46h2at4w46h2at5kreae";
// Encode arbitrary data using "abc" as the human-readable part and append a bech32m checksum.
let hrp = Hrp::parse("abc").expect("valid hrp");
let string = bech32::encode::<Bech32m>(hrp, &DATA).expect("failed to encode string");
assert_eq!(string, STRING);
// Encode arbitrary data as a Bitcoin taproot address.
let taproot_address = segwit::encode(hrp::BC, segwit::VERSION_1, &DATA).expect("valid witness version and program");
assert_eq!(taproot_address, TAP_ADDR);
// No-alloc: Encode without allocating (ignoring that String::new() allocates :).
let mut buf = String::new();
bech32::encode_to_fmt::<Bech32m, String>(&mut buf, hrp, &DATA).expect("failed to encode to buffer");
assert_eq!(buf, STRING);
```

### §Decoding
```
use bech32::primitives::decode::{CheckedHrpstring, SegwitHrpstring};
use bech32::{hrp, segwit, Hrp, Bech32m};
const DATA: [u8; 20] = [0xab; 20]; // Arbitrary data to be encoded.
const STRING: &str = "abc14w46h2at4w46h2at4w46h2at4w46h2at958ngu";
const TAP_ADDR: &str = "bc1p4w46h2at4w46h2at4w46h2at4w46h2at5kreae";
// Decode a bech32 encoded string that includes a bech32/bech32m checksum.
//
// The input address MUST include a valid bech32 or bech32m checksum, for individual specific
// checksum algorithms see [`decode_bech32`], [`decode_bech32m`], [`decode_no_checksum`] or use
// the [`primitives::decode::CheckedHrpstring`] type directly.
let (hrp, data) = bech32::decode(&STRING).expect("failed to decode");
assert_eq!(hrp, Hrp::parse("abc").unwrap());
assert_eq!(data, DATA);
// Decode a Bitcoin taproot address.
let (_hrp, _version, program) = segwit::decode(&TAP_ADDR).expect("valid address");
assert_eq!(program, DATA);
// No-alloc: Decode a bech32m checksummed address without allocating.
let p = CheckedHrpstring::new::<Bech32m>(&STRING).expect("failed to parse string");
assert_eq!(hrp, p.hrp());
assert!(p.byte_iter().eq(DATA.iter().map(|&b| b))); // We yield bytes not references.
// No-alloc: Decode a taproot address without allocating.
let taproot = SegwitHrpstring::new(&TAP_ADDR).expect("valid address");
// Do something with the encoded data.
let _ = taproot.byte_iter();
```

### §Custom Checksum
```
use bech32::Checksum;
/// The codex32 checksum algorithm, defined in BIP-93.
#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Codex32 {}
impl Checksum for Codex32 {
  type MidstateRepr = u128;
  const CHECKSUM_LENGTH: usize = 13;
  const CODE_LENGTH: usize = 93;
  // Copied from BIP-93
  const GENERATOR_SH: [u128; 5] = [
    0x19dc500ce73fde210,
    0x1bfae00def77fe529,
    0x1fbd920fffe7bee52,
    0x1739640bdeee3fdad,
    0x07729a039cfc75f5a,
  ];
  const TARGET_RESIDUE: u128 = 0x10ce0795c2fd1e62a;
}

```

## Modules§

hrp
    Re-exports the hrp types from `primitives::hrp` to make importing ergonomic for the top level APIs.

primitives
    Provides the internal nuts and bolts that enable bech32 encoding/decoding.

segwit
    Segregated Witness API - enables typical usage for encoding and decoding segwit addresses.
## Structs§

Fe32
    An element in GF(32), the finite field containing elements `[0,31]` inclusive.

Hrp
    The human-readable part (human readable prefix before the ‘1’ separator).
## Enums§

Bech32
    The bech32 checksum algorithm, defined in BIP-173.

Bech32m
    The bech32m checksum algorithm, defined in BIP-350.

DecodeError`alloc`
    An error while decoding a bech32 string.

EncodeError
    An error while encoding a bech32 string.

EncodeIoError`std`
    An error while encoding a bech32 string.

NoChecksum
    The “null checksum” used on bech32 strings for which we want to do no checksum checking.
## Traits§

ByteIterExt
    Extension trait for byte iterators which provides an adaptor to GF32 elements.

Checksum
    Trait defining a particular checksum.

Fe32IterExt
    Extension trait for field element iterators.
## Functions§

decode`alloc`
    Decodes a bech32 encoded string.

encode`alloc`
    Encodes `data` as a lowercase bech32 encoded string.

encode_lower`alloc`
    Encodes `data` as a lowercase bech32 encoded string.

encode_lower_to_fmt
    Encodes `data` to a writer (`fmt::Write`) as a lowercase bech32 encoded string.

encode_lower_to_writer`std`
    Encodes `data` to a writer (`io::Write`) as a lowercase bech32 encoded string.

encode_to_fmt
    Encodes `data` to a writer (`fmt::Write`) as a lowercase bech32 encoded string.

encode_to_writer`std`
    Encodes `data` to a writer (`io::Write`) as a lowercase bech32 encoded string.

encode_upper`alloc`
    Encodes `data` as an uppercase bech32 encoded string.

encode_upper_to_fmt
    Encodes `data` to a writer (`fmt::Write`) as a uppercase bech32 encoded string.

encode_upper_to_writer`std`
    Encodes `data` to a writer (`io::Write`) as a uppercase bech32 encoded string.

encoded_length
    Checks that encoding `hrp` and `data` creates a code that is less than the code length for `Ck`.
