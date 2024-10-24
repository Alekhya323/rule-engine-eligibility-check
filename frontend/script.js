async function checkEligibility() {
    const user = {
        age: Number(document.getElementById("age").value),
        income:Number( document.getElementById("income").value),
        department:document.querySelector('input[name="department"]:checked').value,
        experience:Number( document.getElementById("experience").value)
    };
    console.log("user",user);

    const response = await fetch('http://localhost:3000/checkEligibility', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const result = await response.json();
    document.getElementById("result").innerText = result.eligible ? "Eligible" : "Not Eligible";
}