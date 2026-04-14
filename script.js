// ============================================
// TEMPERATURE MONITORING SYSTEM - JAVASCRIPT
// Divide and Conquer Implementation
// ============================================

let temperatures = [];

// ============================================
// DIVIDE AND CONQUER FUNCTIONS
// ============================================

/**
 * findMax() - Find maximum temperature using Divide and Conquer
 * @param {Array} arr - Temperature array
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @return {number} - Maximum temperature
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(log n) - recursive stack
 */
function findMax(arr, low, high) {
    // Base case: Single element
    if (low === high) {
        return arr[low];
    }
    
    // Base case: Two elements
    if (low + 1 === high) {
        return arr[low] > arr[high] ? arr[low] : arr[high];
    }
    
    // Divide: Find middle point
    const mid = Math.floor((low + high) / 2);
    
    // Conquer: Find max in left and right halves
    const leftMax = findMax(arr, low, mid);
    const rightMax = findMax(arr, mid + 1, high);
    
    // Combine: Return maximum of both
    return leftMax > rightMax ? leftMax : rightMax;
}

/**
 * findMin() - Find minimum temperature using Divide and Conquer
 * @param {Array} arr - Temperature array
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @return {number} - Minimum temperature
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(log n) - recursive stack
 */
function findMin(arr, low, high) {
    // Base case: Single element
    if (low === high) {
        return arr[low];
    }
    
    // Base case: Two elements
    if (low + 1 === high) {
        return arr[low] < arr[high] ? arr[low] : arr[high];
    }
    
    // Divide: Find middle point
    const mid = Math.floor((low + high) / 2);
    
    // Conquer: Find min in left and right halves
    const leftMin = findMin(arr, low, mid);
    const rightMin = findMin(arr, mid + 1, high);
    
    // Combine: Return minimum of both
    return leftMin < rightMin ? leftMin : rightMin;
}

/**
 * findSum() - Find sum of temperatures using Divide and Conquer
 * @param {Array} arr - Temperature array
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @return {number} - Sum of all temperatures
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(log n)
 */
function findSum(arr, low, high) {
    // Base case: Single element
    if (low === high) {
        return arr[low];
    }
    
    // Divide: Find middle point
    const mid = Math.floor((low + high) / 2);
    
    // Conquer and Combine: Add left and right halves
    return findSum(arr, low, mid) + findSum(arr, mid + 1, high);
}

/**
 * findAverage() - Calculate average temperature
 * @return {number} - Average temperature
 */
function findAverage() {
    if (temperatures.length === 0) return 0;
    const sum = findSum(temperatures, 0, temperatures.length - 1);
    return sum / temperatures.length;
}

/**
 * detectAbnormal() - Find all temperatures above threshold
 * @param {Array} arr - Temperature array
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @param {number} threshold - Temperature threshold
 * @return {Array} - Array of abnormal temperatures
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k + log n) where k is abnormal count
 */
function detectAbnormal(arr, low, high, threshold) {
    if (low > high) {
        return [];
    }
    
    if (low === high) {
        if (arr[low] > threshold) {
            return [arr[low]];
        }
        return [];
    }
    
    const mid = Math.floor((low + high) / 2);
    const leftAbnormal = detectAbnormal(arr, low, mid, threshold);
    const rightAbnormal = detectAbnormal(arr, mid + 1, high, threshold);
    
    return [...leftAbnormal, ...rightAbnormal];
}

// ============================================
// UI FUNCTIONS
// ============================================

/**
 * getTemperatureStatus() - Get status based on temperature value
 * @param {number} temp - Temperature value
 * @return {Object} - Status object with badge class and text
 */
function getTemperatureStatus(temp) {
    if (temp > 50) {
        return {
            badge: 'status-high',
            text: '🔴 High Alert',
            color: 'red'
        };
    } else if (temp > 40) {
        return {
            badge: 'status-moderate',
            text: '🟡 Moderate',
            color: 'yellow'
        };
    } else {
        return {
            badge: 'status-normal',
            text: '🟢 Normal',
            color: 'green'
        };
    }
}

/**
 * generateInputFields() - Generate sensor input fields dynamically
 */
function generateInputFields() {
    const sensorCount = parseInt(document.getElementById('sensorCount').value);
    
    // Validate input
    if (isNaN(sensorCount) || sensorCount <= 0 || sensorCount > 20) {
        alert('❌ Please enter a valid number between 1 and 20');
        return;
    }
    
    const container = document.getElementById('sensorInputs');
    container.innerHTML = '';
    
    // Create input fields
    for (let i = 0; i < sensorCount; i++) {
        const div = document.createElement('div');
        div.className = 'sensor-input-group';
        div.innerHTML = `
            <label for="sensor${i + 1}">Sensor ${i + 1}</label>
            <input type="number" id="sensor${i + 1}" class="temperature-input" placeholder="°C" />
        `;
        container.appendChild(div);
    }
    
    console.log(`✓ Generated ${sensorCount} input fields`);
}

/**
 * fillSampleData() - Fill with sample temperature data
 */
function fillSampleData() {
    // Sample data: realistic temperature values
    const sampleData = [25, 35, 45, 55, 38, 42, 48, 32, 28, 52];
    
    // Set sensor count
    document.getElementById('sensorCount').value = sampleData.length;
    generateInputFields();
    
    // Fill the inputs with sample data
    const inputs = document.querySelectorAll('.temperature-input');
    inputs.forEach((input, index) => {
        input.value = sampleData[index];
    });
    
    console.log('✓ Sample data loaded');
}

/**
 * clearAllData() - Clear all input fields and results
 */
function clearAllData() {
    document.getElementById('sensorInputs').innerHTML = '';
    document.getElementById('sensorTable').innerHTML = '';
    document.getElementById('maxTemp').textContent = '--°C';
    document.getElementById('minTemp').textContent = '--°C';
    document.getElementById('avgTemp').textContent = '--°C';
    document.getElementById('alertCount').textContent = '0';
    document.getElementById('alertSection').style.display = 'none';
    
    temperatures = [];
    console.log('✓ All data cleared');
}

/**
 * calculateResults() - Main function to calculate and display results
 */
function calculateResults() {
    // Get all temperature inputs
    const inputs = document.querySelectorAll('.temperature-input');
    
    if (inputs.length === 0) {
        alert('❌ Please generate input fields first!');
        return;
    }
    
    // Collect temperature values
    temperatures = [];
    let hasInvalidInput = false;
    
    inputs.forEach((input, index) => {
        const value = parseFloat(input.value);
        
        if (isNaN(value)) {
            alert(`❌ Sensor ${index + 1}: Please enter a valid number`);
            hasInvalidInput = true;
            return;
        }
        
        temperatures.push(value);
    });
    
    if (hasInvalidInput || temperatures.length === 0) {
        return;
    }
    
    // Calculate results using Divide and Conquer
    const maxTemp = findMax(temperatures, 0, temperatures.length - 1);
    const minTemp = findMin(temperatures, 0, temperatures.length - 1);
    const avgTemp = findAverage();
    const abnormalTemps = detectAbnormal(temperatures, 0, temperatures.length - 1, 50);
    
    // Display results
    displayResults(maxTemp, minTemp, avgTemp, abnormalTemps);
    
    console.log('✓ Analysis completed successfully');
}

/**
 * displayResults() - Display calculation results in UI
 */
function displayResults(maxTemp, minTemp, avgTemp, abnormalTemps) {
    // Update result cards
    document.getElementById('maxTemp').textContent = maxTemp.toFixed(1) + '°C';
    document.getElementById('minTemp').textContent = minTemp.toFixed(1) + '°C';
    document.getElementById('avgTemp').textContent = avgTemp.toFixed(2) + '°C';
    document.getElementById('alertCount').textContent = abnormalTemps.length;
    
    // Update sensor table
    updateSensorTable();
    
    // Handle alerts
    if (abnormalTemps.length > 0) {
        displayAlerts(abnormalTemps);
    } else {
        document.getElementById('alertSection').style.display = 'none';
    }
}

/**
 * updateSensorTable() - Update the sensor values table
 */
function updateSensorTable() {
    const tbody = document.getElementById('sensorTable');
    tbody.innerHTML = '';
    
    temperatures.forEach((temp, index) => {
        const status = getTemperatureStatus(temp);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>Sensor ${index + 1}</strong></td>
            <td><strong>${temp.toFixed(1)}°C</strong></td>
            <td><span class="status-badge ${status.badge}">${status.text}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

/**
 * displayAlerts() - Display high temperature alerts
 */
function displayAlerts(abnormalTemps) {
    const alertSection = document.getElementById('alertSection');
    const alertBox = document.getElementById('alertBox');
    
    alertSection.style.display = 'block';
    
    let alertHTML = '<strong>⚠️ WARNING: Abnormal Temperatures Detected!</strong><br>';
    alertHTML += `<p>Found ${abnormalTemps.length} temperature(s) above 50°C:</p>`;
    
    abnormalTemps.forEach(temp => {
        alertHTML += `<p>• ${temp.toFixed(1)}°C - IMMEDIATE ATTENTION REQUIRED</p>`;
    });
    
    alertBox.innerHTML = alertHTML;
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌡️ Temperature Monitoring System - Frontend Loaded');
    console.log('Using Divide & Conquer Algorithm');
    
    // Set default sensor count
    document.getElementById('sensorCount').addEventListener('change', function() {
        const value = parseInt(this.value);
        if (value > 0 && value <= 20) {
            generateInputFields();
        }
    });
});

// Allow Enter key to trigger calculation
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateResults();
    }
});

console.log('%c🌡️ Temperature Monitoring System', 'color: #667eea; font-size: 14px; font-weight: bold;');
console.log('%cAlgorithm: Divide and Conquer | Time: O(n) | Space: O(log n)', 'color: #764ba2; font-size: 12px;');
