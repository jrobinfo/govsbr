#!/bin/bash

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Create a results directory for test outputs
RESULTS_DIR="test_results"
mkdir -p "$RESULTS_DIR"

echo -e "${BOLD}${BLUE}Strategic Bitcoin Reserve (SBR) Lockup Demo - Comprehensive Test Suite${NC}"
echo "===================================================================="
echo "Started at: $(date)"
echo ""

# Function to log a message to both console and the log file
log_message() {
    local message="$1"
    local color="$2"
    echo -e "${color}${message}${NC}"
    echo "$message" >> "$RESULTS_DIR/test_log.txt"
}

# Function to create a separator in logs
log_separator() {
    log_message "------------------------------------------------------------" "$YELLOW"
}

# Initialize log file
echo "SBR Lockup Demo Test Suite Log - $(date)" > "$RESULTS_DIR/test_log.txt"
echo "====================================================" >> "$RESULTS_DIR/test_log.txt"
echo "" >> "$RESULTS_DIR/test_log.txt"

# Step 1: Check environment
log_message "Stage 1: Environment Check" "$BOLD$BLUE"
log_separator

# Check if cargo is installed
log_message "Checking for Rust and Cargo..." "$YELLOW"
if ! command -v cargo &> /dev/null; then
    log_message "❌ Cargo is not installed. Please install Rust and Cargo: https://rustup.rs/" "$RED"
    exit 1
fi
log_message "✅ Cargo is installed" "$GREEN"

# Get Rust and Cargo versions
log_message "Rust Version: $(rustc --version)" "$YELLOW"
log_message "Cargo Version: $(cargo --version)" "$YELLOW"

# Check if we can load the required crates
log_message "Checking dependencies..." "$YELLOW"
cargo check &> "$RESULTS_DIR/cargo_check.log"
if [ $? -ne 0 ]; then
    log_message "❌ Dependency check failed. See $RESULTS_DIR/cargo_check.log for details." "$RED"
    exit 1
fi
log_message "✅ Dependencies OK" "$GREEN"

# Step 2: Build the project
log_message "\nStage 2: Building the Project" "$BOLD$BLUE"
log_separator

log_message "Building debug binaries..." "$YELLOW"
cargo build &> "$RESULTS_DIR/build.log"
if [ $? -ne 0 ]; then
    log_message "❌ Build failed. See $RESULTS_DIR/build.log for details." "$RED"
    exit 1
fi
log_message "✅ Debug build successful" "$GREEN"

log_message "Building release binaries..." "$YELLOW"
cargo build --release &> "$RESULTS_DIR/build_release.log"
if [ $? -ne 0 ]; then
    log_message "❌ Release build failed. See $RESULTS_DIR/build_release.log for details." "$RED"
    log_message "Continuing with debug build only." "$YELLOW"
else
    log_message "✅ Release build successful" "$GREEN"
fi

# Step 3: Run unit tests
log_message "\nStage 3: Running Unit Tests" "$BOLD$BLUE"
log_separator

log_message "Running unit tests..." "$YELLOW"
cargo test --bin tests -- --show-output &> "$RESULTS_DIR/unit_tests.log"
UNIT_TEST_RESULT=$?

# Count number of tests and parse the results
if [ -f "$RESULTS_DIR/unit_tests.log" ]; then
    TOTAL_TESTS=$(grep -c "test result" "$RESULTS_DIR/unit_tests.log")
    PASSED_TESTS=$(grep "test result: ok" "$RESULTS_DIR/unit_tests.log" | grep -o "[0-9]* passed" | awk '{print $1}')
    FAILED_TESTS=$(grep "test result:" "$RESULTS_DIR/unit_tests.log" | grep -o "[0-9]* failed" | awk '{print $1}')
    
    if [ -z "$PASSED_TESTS" ]; then PASSED_TESTS=0; fi
    if [ -z "$FAILED_TESTS" ]; then FAILED_TESTS=0; fi
    
    if [ $UNIT_TEST_RESULT -eq 0 ]; then
        log_message "✅ All unit tests passed: $PASSED_TESTS tests" "$GREEN"
    else
        log_message "❌ Unit tests failed: $FAILED_TESTS of $TOTAL_TESTS failed" "$RED"
        log_message "See $RESULTS_DIR/unit_tests.log for details." "$YELLOW"
    fi
else
    log_message "❌ Unit test output not found" "$RED"
fi

# Step 4: Run the binaries and check their output
log_message "\nStage 4: Running Binaries and Verifying Output" "$BOLD$BLUE"
log_separator

# Function to run a binary and check its output for expected patterns
run_and_verify_binary() {
    local binary_name=$1
    local output_file="$RESULTS_DIR/${binary_name}_output.log"
    local expected_patterns_file="$RESULTS_DIR/${binary_name}_expected.txt"
    
    log_message "Running $binary_name..." "$YELLOW"
    
    # Create file with expected patterns
    cat > "$expected_patterns_file" << EOL
$(echo "$2" | tr ',' '\n')
EOL
    
    # Run the binary and capture output
    cargo run --bin "$binary_name" &> "$output_file"
    EXIT_CODE=$?
    
    if [ $EXIT_CODE -ne 0 ]; then
        log_message "❌ $binary_name failed with exit code $EXIT_CODE" "$RED"
        log_message "See $output_file for details." "$YELLOW"
        return 1
    fi
    
    # Check for expected patterns
    local missing_patterns=0
    while IFS= read -r pattern; do
        if ! grep -q "$pattern" "$output_file"; then
            log_message "❌ Missing expected output: $pattern" "$RED"
            missing_patterns=$((missing_patterns + 1))
        fi
    done < "$expected_patterns_file"
    
    if [ $missing_patterns -eq 0 ]; then
        log_message "✅ $binary_name ran successfully with all expected output" "$GREEN"
        return 0
    else
        log_message "❌ $binary_name is missing $missing_patterns expected output patterns" "$RED"
        log_message "See $output_file and $expected_patterns_file for details." "$YELLOW"
        return 1
    fi
}

# Define expected patterns for each binary
SBR_LOCKUP_PATTERNS="Strategic Bitcoin Reserve,Committee Members: 5 members,3-of-5 signatures,Taproot Descriptor,Deposit Address,Multi-signature protection"
POLICY_ANALYZER_PATTERNS="Policy Analysis,Total keys referenced,Policy contains timelocks,Policy contains threshold,Descriptor Validation,Valid Bitcoin address"
TAPROOT_ANALYSIS_PATTERNS="Taproot for Strategic Bitcoin Reserve,Taproot Descriptor Variations,Basic Taproot,Script Paths,Security Benefits,Privacy Enhancement"

# Run each binary and verify output
run_and_verify_binary "sbr_lockup" "$SBR_LOCKUP_PATTERNS"
SBR_RESULT=$?

run_and_verify_binary "policy_analyzer" "$POLICY_ANALYZER_PATTERNS"
POLICY_RESULT=$?

run_and_verify_binary "taproot_analysis" "$TAPROOT_ANALYSIS_PATTERNS"
TAPROOT_RESULT=$?

# Step 5: Performance tests (simple)
log_message "\nStage 5: Performance Tests" "$BOLD$BLUE"
log_separator

log_message "Running performance tests (simple timing)..." "$YELLOW"

# Function to time the execution of a binary
time_execution() {
    local binary_name=$1
    local runs=$2
    local output_file="$RESULTS_DIR/${binary_name}_perf.log"
    
    log_message "Timing $binary_name for $runs runs..." "$YELLOW"
    
    # Clear the output file
    > "$output_file"
    
    # Run the binary multiple times and measure execution time
    local total_time=0
    for i in $(seq 1 $runs); do
        start_time=$(date +%s.%N)
        cargo run --release --bin "$binary_name" &> /dev/null
        end_time=$(date +%s.%N)
        execution_time=$(echo "$end_time - $start_time" | bc)
        total_time=$(echo "$total_time + $execution_time" | bc)
        echo "Run $i: $execution_time seconds" >> "$output_file"
    done
    
    # Calculate average time
    avg_time=$(echo "scale=3; $total_time / $runs" | bc)
    echo "Average time: $avg_time seconds" >> "$output_file"
    log_message "Average execution time: $avg_time seconds" "$GREEN"
}

# Time each binary for 3 runs
time_execution "sbr_lockup" 3
time_execution "policy_analyzer" 3
time_execution "taproot_analysis" 3

# Generate summary report
log_message "\nStage 6: Test Summary" "$BOLD$BLUE"
log_separator

REPORT_FILE="$RESULTS_DIR/test_report.md"

# Create the report header
cat > "$REPORT_FILE" << EOL
# SBR Lockup Demo Test Report

**Date:** $(date)

## Summary

| Test Type | Status | Details |
|-----------|--------|---------|
EOL

# Add unit test results to the report
if [ $UNIT_TEST_RESULT -eq 0 ]; then
    echo "| Unit Tests | ✅ Pass | $PASSED_TESTS tests passed |" >> "$REPORT_FILE"
else
    echo "| Unit Tests | ❌ Fail | $FAILED_TESTS of $TOTAL_TESTS tests failed |" >> "$REPORT_FILE"
fi

# Add binary execution results to the report
if [ $SBR_RESULT -eq 0 ]; then
    echo "| sbr_lockup | ✅ Pass | All expected output verified |" >> "$REPORT_FILE"
else
    echo "| sbr_lockup | ❌ Fail | Missing expected output |" >> "$REPORT_FILE"
fi

if [ $POLICY_RESULT -eq 0 ]; then
    echo "| policy_analyzer | ✅ Pass | All expected output verified |" >> "$REPORT_FILE"
else
    echo "| policy_analyzer | ❌ Fail | Missing expected output |" >> "$REPORT_FILE"
fi

if [ $TAPROOT_RESULT -eq 0 ]; then
    echo "| taproot_analysis | ✅ Pass | All expected output verified |" >> "$REPORT_FILE"
else
    echo "| taproot_analysis | ❌ Fail | Missing expected output |" >> "$REPORT_FILE"
fi

# Add performance data to the report
echo -e "\n## Performance (Release Build)\n" >> "$REPORT_FILE"
echo "| Binary | Average Execution Time |" >> "$REPORT_FILE"
echo "|--------|------------------------|" >> "$REPORT_FILE"

for binary in sbr_lockup policy_analyzer taproot_analysis; do
    avg_time=$(grep "Average time" "$RESULTS_DIR/${binary}_perf.log" | awk '{print $3}')
    echo "| $binary | $avg_time seconds |" >> "$REPORT_FILE"
done

# Add recommendations section
echo -e "\n## Recommendations\n" >> "$REPORT_FILE"

if [ $UNIT_TEST_RESULT -eq 0 ] && [ $SBR_RESULT -eq 0 ] && [ $POLICY_RESULT -eq 0 ] && [ $TAPROOT_RESULT -eq 0 ]; then
    echo "✅ All tests passed. The SBR Lockup Demo is working correctly and ready for use." >> "$REPORT_FILE"
else
    echo "⚠️ Some tests failed. Please review the logs and fix the issues before using the demo." >> "$REPORT_FILE"
fi

# Display the final summary
log_message "\nTest Suite Completed!" "$BOLD$BLUE"
log_message "Summary Report: $REPORT_FILE" "$YELLOW"

if [ $UNIT_TEST_RESULT -eq 0 ] && [ $SBR_RESULT -eq 0 ] && [ $POLICY_RESULT -eq 0 ] && [ $TAPROOT_RESULT -eq 0 ]; then
    log_message "✅ All tests passed! The SBR Lockup Demo is working correctly." "$GREEN"
    exit 0
else
    log_message "❌ Some tests failed. Please review the report for details." "$RED"
    exit 1
fi 