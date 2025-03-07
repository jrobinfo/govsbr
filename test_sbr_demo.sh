#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Strategic Bitcoin Reserve (SBR) Lockup Demo - Automated Test${NC}"
echo "==============================================================="
echo ""

# Function to check if a command succeeded
check_success() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Success${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed${NC}"
        return 1
    fi
}

# Function to run a binary and check for expected patterns in output
run_and_validate() {
    binary_name=$1
    shift
    expected_patterns=("$@")
    
    echo -e "\n${YELLOW}Running $binary_name...${NC}"
    
    # Run the binary and capture output
    output=$(cargo run --bin $binary_name 2>&1)
    exit_code=$?
    
    if [ $exit_code -ne 0 ]; then
        echo -e "${RED}✗ Binary failed with exit code $exit_code${NC}"
        echo "Output:"
        echo "$output"
        return 1
    fi
    
    # Check for expected patterns
    all_found=true
    echo "Validating output..."
    
    for pattern in "${expected_patterns[@]}"; do
        if echo "$output" | grep -q "$pattern"; then
            echo -e "${GREEN}✓ Found: $pattern${NC}"
        else
            echo -e "${RED}✗ Missing: $pattern${NC}"
            all_found=false
        fi
    done
    
    if [ "$all_found" = true ]; then
        echo -e "${GREEN}✓ All expected patterns found${NC}"
        return 0
    else
        echo -e "${RED}✗ Some expected patterns were missing${NC}"
        echo "Full Output:"
        echo "$output"
        return 1
    fi
}

# Check if cargo is installed
echo "Checking for Rust and Cargo..."
if ! command -v cargo &> /dev/null; then
    echo -e "${RED}✗ Cargo is not installed. Please install Rust and Cargo: https://rustup.rs/${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Cargo is installed${NC}"

# Step 1: Build the project
echo -e "\n${YELLOW}Building the project...${NC}"
cargo build
check_success
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to build the project. Exiting.${NC}"
    exit 1
fi

# Step 2: Run sbr_lockup and check for expected output
sbr_patterns=(
    "Strategic Bitcoin Reserve"
    "Committee Members: 5 members"
    "Basic 3-of-5 Multisig"
    "Multisig with Emergency Timelock"
    "Complex Lockup Policy"
    "Taproot Descriptor"
    "Sample Deposit Address"
    "bc1p"  # Part of a Taproot address prefix
    "Multi-signature protection prevents unilateral access"
)
run_and_validate "sbr_lockup" "${sbr_patterns[@]}"
sbr_result=$?

# Step 3: Run policy_analyzer and check for expected output
policy_patterns=(
    "Strategic Bitcoin Reserve Policy Analyzer"
    "Analyzing complex policy"
    "Policy Analysis"
    "Total keys referenced"
    "Policy contains timelocks"
    "Policy contains threshold"
    "Number of distinct spending paths"
    "Descriptor Validation"
)
run_and_validate "policy_analyzer" "${policy_patterns[@]}"
policy_result=$?

# Step 4: Run taproot_analysis and check for expected output
taproot_patterns=(
    "Taproot for Strategic Bitcoin Reserve"
    "Taproot Descriptor Variations"
    "Basic Taproot"
    "Sample Address"
    "Benefit: Maximum privacy"
    "Security Benefits of Taproot"
    "Privacy Enhancement"
    "Cost Efficiency"
)
run_and_validate "taproot_analysis" "${taproot_patterns[@]}"
taproot_result=$?

# Show summary of results
echo -e "\n${YELLOW}Test Summary:${NC}"
echo "==============="

overall_success=true

if [ $sbr_result -eq 0 ]; then
    echo -e "${GREEN}✓ sbr_lockup: Passed${NC}"
else
    echo -e "${RED}✗ sbr_lockup: Failed${NC}"
    overall_success=false
fi

if [ $policy_result -eq 0 ]; then
    echo -e "${GREEN}✓ policy_analyzer: Passed${NC}"
else
    echo -e "${RED}✗ policy_analyzer: Failed${NC}"
    overall_success=false
fi

if [ $taproot_result -eq 0 ]; then
    echo -e "${GREEN}✓ taproot_analysis: Passed${NC}"
else
    echo -e "${RED}✗ taproot_analysis: Failed${NC}"
    overall_success=false
fi

echo ""
if [ "$overall_success" = true ]; then
    echo -e "${GREEN}All tests passed! The SBR Lockup Demo is working correctly.${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please check the output above for details.${NC}"
    exit 1
fi 