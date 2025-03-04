#!/bin/bash

# Number of test runs
NUM_RUNS=2

# Output file for results
RESULT_FILE="cypress_test_results_ts4.txt"

# Initialize total time accumulator
total_time=0

# Clear previous results
echo "Cypress Test Execution Times: Test Suite 4" > "$RESULT_FILE"
echo "-----------------------------" >> "$RESULT_FILE"

# Loop to run tests repeatedly
for (( i=1; i<=NUM_RUNS; i++ ))
do
    echo "Starting run $i..."
    # Record start time
    start=$(date +%s.%N)

    # Run the Cypress test suite (ensure your project is running locally)
    npx cypress run --headed --spec "cypress/e2e/suite4/projects4.cy.ts" --browser chrome

    # Record end time
    end=$(date +%s.%N)

    # Calculate run time using bc for floating point arithmetic
    runtime=$(echo "$end - $start" | bc)

    # Log individual run time
    echo "Run $i: $runtime seconds" >> "$RESULT_FILE"

    # Sum up the times
    total_time=$(echo "$total_time + $runtime" | bc)
done

# Calculate average time per run
average=$(echo "$total_time / $NUM_RUNS" | bc -l)

# Write summary to the results file
echo "-----------------------------" >> "$RESULT_FILE"
echo "Total execution time: $total_time seconds" >> "$RESULT_FILE"
echo "Average execution time: $average seconds" >> "$RESULT_FILE"

echo "Results have been written to $RESULT_FILE"
