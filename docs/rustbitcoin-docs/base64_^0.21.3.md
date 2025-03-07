Docs.rs
  * base64-0.21.7
    * base64 0.21.7 
    * Docs.rs crate page 
    * MIT OR Apache-2.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * alicemaz 
    * marshallpierce 
    * Dependencies
    *       * clap ^3.2.25 _dev_
      * criterion ^0.4.0 _dev_
      * once_cell ^1 _dev_
      * rand ^0.8.5 _dev_
      * rstest ^0.13.0 _dev_
      * rstest_reuse ^0.6.0 _dev_
      * strum ^0.25 _dev_
    * Versions
  * Go to latest version
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


# Crate base64![Copy item path](https://docs.rs/-/rustdoc.static/clipboard-7571035ce49a181d.svg)
source · [−]
Expand description
Correct, fast, and configurable base64 decoding and encoding. Base64 transports binary data efficiently in contexts where only plain text is allowed.
## Usage
Use an `Engine` to decode or encode base64, configured with the base64 alphabet and padding behavior best suited to your application.
### Engine setup
There is more than one way to encode a stream of bytes as “base64”. Different applications use different encoding alphabets and padding behaviors.
#### Encoding alphabet
Almost all base64 alphabets use `A-Z`, `a-z`, and `0-9`, which gives nearly 64 characters (26 + 26 + 10 = 62), but they differ in their choice of their final 2.
Most applications use the standard alphabet specified in RFC 4648. If that’s all you need, you can get started quickly by using the pre-configured `STANDARD` engine, which is also available in the `prelude` module as shown here, if you prefer a minimal `use` footprint.
```
use base64::prelude::*;
assert_eq!(BASE64_STANDARD.decode(b"+uwgVQA=")?, b"\xFA\xEC\x20\x55\0");
assert_eq!(BASE64_STANDARD.encode(b"\xFF\xEC\x20\x55\0"), "/+wgVQA=");
```

Other common alphabets are available in the `alphabet` module.
##### URL-safe alphabet
The standard alphabet uses `+` and `/` as its two non-alphanumeric tokens, which cannot be safely used in URL’s without encoding them as `%2B` and `%2F`.
To avoid that, some applications use a “URL-safe” alphabet, which uses `-` and `_` instead. To use that alternative alphabet, use the `URL_SAFE` engine. This example doesn’t use `prelude` to show what a more explicit `use` would look like.
```
use base64::{engine::general_purpose::URL_SAFE, Engine as _};
assert_eq!(URL_SAFE.decode(b"-uwgVQA=")?, b"\xFA\xEC\x20\x55\0");
assert_eq!(URL_SAFE.encode(b"\xFF\xEC\x20\x55\0"), "_-wgVQA=");
```

#### Padding characters
Each base64 character represents 6 bits (2⁶ = 64) of the original binary data, and every 3 bytes of input binary data will encode to 4 base64 characters (8 bits × 3 = 6 bits × 4 = 24 bits).
When the input is not an even multiple of 3 bytes in length, canonical base64 encoders insert padding characters at the end, so that the output length is always a multiple of 4:
```
use base64::{engine::general_purpose::STANDARD, Engine as _};
assert_eq!(STANDARD.encode(b""),  "");
assert_eq!(STANDARD.encode(b"f"),  "Zg==");
assert_eq!(STANDARD.encode(b"fo"), "Zm8=");
assert_eq!(STANDARD.encode(b"foo"), "Zm9v");
```

Canonical encoding ensures that base64 encodings will be exactly the same, byte-for-byte, regardless of input length. But the `=` padding characters aren’t necessary for decoding, and they may be omitted by using a `NO_PAD` configuration:
```
use base64::{engine::general_purpose::STANDARD_NO_PAD, Engine as _};
assert_eq!(STANDARD_NO_PAD.encode(b""),  "");
assert_eq!(STANDARD_NO_PAD.encode(b"f"),  "Zg");
assert_eq!(STANDARD_NO_PAD.encode(b"fo"), "Zm8");
assert_eq!(STANDARD_NO_PAD.encode(b"foo"), "Zm9v");
```

The pre-configured `NO_PAD` engines will reject inputs containing padding `=` characters. To encode without padding and still accept padding while decoding, create an engine with that padding mode.
```
assert_eq!(STANDARD_NO_PAD.decode(b"Zm8="), Err(base64::DecodeError::InvalidPadding));
```

#### Further customization
Decoding and encoding behavior can be customized by creating an engine with an alphabet and padding configuration:
```
use base64::{engine, alphabet, Engine as _};
// bizarro-world base64: +/ as the first symbols instead of the last
let alphabet =
  alphabet::Alphabet::new("+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
  .unwrap();
// a very weird config that encodes with padding but requires no padding when decoding...?
let crazy_config = engine::GeneralPurposeConfig::new()
  .with_decode_allow_trailing_bits(true)
  .with_encode_padding(true)
  .with_decode_padding_mode(engine::DecodePaddingMode::RequireNone);
let crazy_engine = engine::GeneralPurpose::new(&alphabet, crazy_config);
let encoded = crazy_engine.encode(b"abc 123");

```

### Memory allocation
The decode and encode engine methods allocate memory for their results – `decode` returns a `Vec<u8>` and `encode` returns a `String`. To instead decode or encode into a buffer that you allocated, use one of the alternative methods:
##### Decoding
Method| Output| Allocates memory  
---|---|---  
`Engine::decode`| returns a new `Vec<u8>`| always  
`Engine::decode_vec`| appends to provided `Vec<u8>`| if `Vec` lacks capacity  
`Engine::decode_slice`| writes to provided `&[u8]`| never  
##### Encoding
Method| Output| Allocates memory  
---|---|---  
`Engine::encode`| returns a new `String`| always  
`Engine::encode_string`| appends to provided `String`| if `String` lacks capacity  
`Engine::encode_slice`| writes to provided `&[u8]`| never  
### Input and output
The `base64` crate can decode and encode values in memory, or `DecoderReader` and `EncoderWriter` provide streaming decoding and encoding for any readable or writable byte stream.
##### Decoding
```
use base64::{engine::general_purpose::STANDARD, read::DecoderReader};
let mut input = io::stdin();
let mut decoder = DecoderReader::new(&mut input, &STANDARD);
io::copy(&mut decoder, &mut io::stdout())?;
```

##### Encoding
```
use base64::{engine::general_purpose::STANDARD, write::EncoderWriter};
let mut output = io::stdout();
let mut encoder = EncoderWriter::new(&mut output, &STANDARD);
io::copy(&mut io::stdin(), &mut encoder)?;
```

##### Display
If you only need a base64 representation for implementing the `Display` trait, use `Base64Display`:
```
use base64::{display::Base64Display, engine::general_purpose::STANDARD};
let value = Base64Display::new(b"\0\x01\x02\x03", &STANDARD);
assert_eq!("base64: AAECAw==", format!("base64: {}", value));
```

## Panics
If length calculations result in overflowing `usize`, a panic will result.
## Re-exports
  * `pub use engine::Engine;`


## Modules
  * alphabet
Provides Alphabet and constants for alphabets commonly used in the wild.
  * display
Enables base64’d output anywhere you might use a `Display` implementation, like a format string.
  * engine
Provides the Engine abstraction and out of the box implementations.
  * prelude
Preconfigured engines for common use cases.
  * read
Implementations of `io::Read` to transparently decode base64.
  * write
Implementations of `io::Write` to transparently handle base64.


## Enums
  * DecodeError
Errors that can occur while decoding.
  * DecodeSliceError
Errors that can occur while decoding into a slice.
  * EncodeSliceError
Errors that can occur while encoding into a slice.


## Functions
  * decodeDeprecated
Decode base64 using the `STANDARD` engine.
  * decode_engineDeprecated
Decode from string reference as octets using the specified Engine.
  * decode_engine_sliceDeprecated
Decode the input into the provided output slice.
  * decode_engine_vecDeprecated
Decode from string reference as octets.
  * decoded_len_estimate
Returns a conservative estimate of the decoded size of `encoded_len` base64 symbols (rounded up to the next group of 3 decoded bytes).
  * encodeDeprecated
Encode arbitrary octets as base64 using the `STANDARD` engine.
  * encode_engineDeprecated
Encode arbitrary octets as base64 using the provided `Engine` into a new `String`.
  * encode_engine_sliceDeprecated
Encode arbitrary octets as base64 into a supplied slice.
  * encode_engine_stringDeprecated
Encode arbitrary octets as base64 into a supplied `String`.
  * encoded_len
Calculate the base64 encoded length for a given input length, optionally including any appropriate padding bytes.


