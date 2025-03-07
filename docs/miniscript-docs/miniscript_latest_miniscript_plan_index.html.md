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
# Module planCopy item path
Settings
Help
SummarySource
Expand description
A spending plan or _plan_ for short is a representation of a particular spending path on a descriptor. This allows us to analayze a choice of spending path without producing any signatures or other witness data for it.
To make a plan you provide the descriptor with “assets” like which keys you are able to use, hash pre-images you have access to, absolute/relative timelock constraints etc.
Once you’ve got a plan it can tell you its expected satisfaction weight which can be useful for doing coin selection. Furthermore it provides which subset of those keys and hash pre-images you will actually need as well as what locktime or sequence number you need to set.
Once you’ve obtained signatures, hash pre-images etc required by the plan, it can create a witness/script_sig for the input.
## Structs§

Assets
    The Assets we can use to satisfy a particular spending path

CanSign
    Signatures which a key can produce

LoggerAssetProvider
    Wrapper around `Assets` that logs every query and value returned

Plan
    Representation of a particular spending path on a descriptor. Contains the witness template and the timelocks needed for satisfying the plan. Calling `plan` on a Descriptor will return this structure, containing the cheapest spending path possible (considering the `Assets` given)

TaprootCanSign
    Signatures which a taproot key can produce
## Enums§

TaprootAvailableLeaves
    Which taproot leaves the key can sign for
## Traits§

AssetProvider
    Trait describing a present/missing lookup table for constructing witness templates

IntoAssets
    Conversion into a `Assets`
