#!/bin/bash

# Number of test runs
NUM_RUNS=2

# Output file for results
RESULT_FILE="cypress_test_results_ts4.txt"

# Initialize total time accumulator and counters
total_time=0
passed_count=0
failed_count=0

# Clear previous results
echo "Cypress Test Execution Times: Test Suite 5" > "$RESULT_FILE"
echo "-----------------------------" >> "$RESULT_FILE"

# Loop to run tests repeatedly
for (( i=1; i<=NUM_RUNS; i++ ))
do
    echo "Starting run $i..."
    # Record start time
    start=$(date +%s.%N)

    # Run the Cypress test suite
    npx cypress run --headed --spec "cypress/e2e/suite5/projects5.cy.ts"
    exit_code=$?

    if [ $exit_code -eq 0 ]; then
         # Record end time if test passed
         end=$(date +%s.%N)
         # Calculate runtime
         runtime=$(echo "$end - $start" | bc)
         # Log successful run with runtime
         echo "Run $i (PASS): $runtime seconds" >> "$RESULT_FILE"
         total_time=$(echo "$total_time + $runtime" | bc)
         passed_count=$((passed_count+1))
    else
         # Log failed run without runtime
         echo "Run $i (FAIL)" >> "$RESULT_FILE"
         failed_count=$((failed_count+1))
    fi
done

# Calculate average time per successful run
if [ "$passed_count" -gt 0 ]; then
    average=$(echo "$total_time / $passed_count" | bc -l)
else
    average=0
fi

# Write summary to the results file
echo "-----------------------------" >> "$RESULT_FILE"
echo "Total execution time (successful runs): $total_time seconds" >> "$RESULT_FILE"
echo "Average execution time (successful runs): $average seconds" >> "$RESULT_FILE"
echo "Passed runs: $passed_count" >> "$RESULT_FILE"
echo "Failed runs: $failed_count" >> "$RESULT_FILE"

echo "Results have been written to $RESULT_FILE"
