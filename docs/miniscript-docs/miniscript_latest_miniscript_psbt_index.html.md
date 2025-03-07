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
# Module psbtCopy item path
Settings
Help
SummarySource
Expand description
## §Partially-Signed Bitcoin Transactions
This module implements the Finalizer and Extractor roles defined in BIP 174, PSBT, described at `https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki`
## Structs§

PsbtInputSatisfier
    Psbt satisfier for at inputs at a particular index Takes in &psbt because multiple inputs will share the same psbt structure All operations on this structure will panic if index is more than number of inputs in pbst
## Enums§

Error
    Error type for entire Psbt

InputError
    Error type for Pbst Input

OutputUpdateError
    Return error type for `PsbtExt::update_output_with_descriptor`

PsbtSighashMsg
    Sighash message(signing data) for a given psbt transaction input.

SighashError
    Return error type for `PsbtExt::sighash_msg`

UtxoUpdateError
    Return error type for `PsbtExt::update_input_with_descriptor`
## Traits§

PsbtExt
    Additional operations for miniscript descriptors for various psbt roles. Note that these APIs would generally error when used on scripts that are not miniscripts.

PsbtInputExt
    Extension trait for PSBT inputs

PsbtOutputExt
    Extension trait for PSBT outputs
## Functions§

finalizeDeprecated
    Finalize the psbt. This function takes in a mutable reference to psbt and populates the final_witness and final_scriptsig of the psbt assuming all of the inputs are miniscript as per BIP174. If any of the inputs is not miniscript, this returns a parsing error For satisfaction of individual inputs, use the satisfy API. This function also performs a sanity interpreter check on the finalized psbt which involves checking the signatures/ preimages/timelocks. The functions fails it is not possible to satisfy any of the inputs non-malleably See finalize_mall if you want to allow malleable satisfactions

finalize_mall
    Same as finalize, but allows for malleable satisfactions

interpreter_check
    Interprets all psbt inputs and checks whether the script is correctly interpreted according to the context The psbt must have included final script sig and final witness. In other words, this checks whether the finalized psbt interprets correctly
