document.addEventListener('DOMContentLoaded', function() {
    const imageInfoMap = {
        'image1': ['Gross annual', 'income is your total', 'salary in a year','before any','deductions'],
        'image2': ['extra income is', ' your total salary', 'and extra income ','before any ','deductions'],
        'image3': [' 30% for people with age < 40','40% for age >= 40 but < 60','10% for age >= 60 '],
        'image4': ['In your total', 'salary some amount', 'of deductions','is total applicable deductions'],   
    };

    
    Object.entries(imageInfoMap).forEach(([imageId, info], index) => {
        const imageIcon = document.getElementById(imageId);
        if (imageIcon) {
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info-div');
            infoDiv.classList.add(`info-div-${index + 1}`); 
            info.forEach(line => {
                const lineDiv = document.createElement('div');
                lineDiv.textContent = line;
                infoDiv.appendChild(lineDiv);
            });
           
            infoDiv.style.position = 'absolute';
            infoDiv.style.padding = '5px';
            infoDiv.style.display = 'none'; 
            document.body.appendChild(infoDiv);

            imageIcon.addEventListener('mouseover', function() {
                infoDiv.style.display = 'block';
            });

            imageIcon.addEventListener('mouseout', function() {
                infoDiv.style.display = 'none';
            });
        }
    });

  
    document.getElementById('taxCalculatorForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const age = document.getElementById('age').value;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;

        let taxRate;
        if (age === '<40') {
            taxRate = 0.3;
        } else if (age === '≥ 40 & < 60') {
            taxRate = 0.4;
        } else if (age === '≥ 60') {
            taxRate = 0.1;
        }

        const taxableIncome = Math.max(grossIncome + extraIncome - deductions - 800000, 0);
        const taxAmount = taxableIncome * taxRate;
        const overallIncome = grossIncome + extraIncome - taxAmount;

        const formattedOverallIncome = overallIncome.toLocaleString('en-IN');

        const modal = document.getElementById('modal');
        const result = document.getElementById('result');
        result.innerHTML = `<p class="first">Your overall income will be</p> 
                            <p class="second">${formattedOverallIncome}</p>
                            <p class="third">after tax deductions</p>`;
        modal.style.display = 'block';

       
        const closeBtn = document.getElementsByClassName('btn')[0];
        closeBtn.onclick = function() {
            modal.style.display = 'none';
           
            document.getElementById('taxCalculatorForm').reset();
        };
    });
});
