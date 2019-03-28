/*jshint esversion: 6 */
// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';


    //  show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

//  Calculate results

function calculateResults(e){
  //  Ui variables

  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Vicisleniye mesacnoy oplati

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // showresults
    document.getElementById('results').style.display = 'block';

    // hideresults
    document.getElementById('loading').style.display = 'none';

  } else {
     showError('Please check your numbers');
  }


}

function showError(error){
  // showresults
  document.getElementById('results').style.display = 'none';

  // hideresults
  document.getElementById('loading').style.display = 'none';
  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';

  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading

  card.insertBefore(errorDiv, heading);   // card i heading tut ispolzuyetsya mejdu kakimi elementami vstavit errorDiv

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}
