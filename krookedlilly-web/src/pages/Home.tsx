import React from "react";
import logo from "../KrookedLillyTransparent.png"

export const Home: React.FC = () => {
  // window.onload = function () {
  //   const el = document.querySelector('#generateCode');
  //   el?.addEventListener('submit', function (event) {
  //     event.preventDefault(); // Prevent default form submission

  //     const userName = (document.querySelector('#userName') as HTMLInputElement).value;

  //     // // Prepare data for the request (e.g., as a JSON object)
  //     const data = { username: userName };
  //     console.log("data", data);

  //     fetch('https://devoted-termite-closing.ngrok-free.app/generate-code', { // Replace with your API endpoint
  //       method: 'POST', // or 'GET', 'PUT', 'DELETE' depending on your API
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data), // Convert data to JSON string
  //     })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         return response.json(); // Parse the response body as JSON
  //       })
  //       .then(data => {
  //         // Handle the successful response data
  //         (document.querySelector('#responseContainer') as HTMLInputElement).innerText = 'Response: ' + JSON.stringify(data);
  //       })
  //       .catch(error => {
  //         // Handle any errors during the fetch operation
  //         (document.querySelector('#responseContainer') as HTMLInputElement).innerText = 'Error: ' + error.message;
  //         console.error('There was an error!', error);
  //       });
  //   });

  //   const el2 = document.querySelector('#validateCode');
  //   el2?.addEventListener('submit', function (event) {
  //     event.preventDefault(); // Prevent default form submission

  //     const code = (document.querySelector('#code') as HTMLInputElement).value;
  //     const platform = (document.querySelector('#platform') as HTMLSelectElement).value;
  //     window.open(`https://devoted-termite-closing.ngrok-free.app/download/?code=${code}&platform=${platform}`);
  //   });
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.tsx</code> and save to reload. */}
          This site is under construction. Exciting things are coming!
        </p>
      </header>
    </div>
    // <>
    //   <form action="" id="generateCode">
    //     <div>
    //       <label>Enter UserName:</label>
    //       <input type="text" name="userName" id="userName" required />
    //       <input type="submit" value="Generate" />
    //     </div>
    //   </form>

    //   <form action="" id="validateCode">
    //     <div>
    //       <label>Enter Code:</label>
    //       <input type="text" name="code" id="code" required />
    //       <select name="platform" id="platform">
    //         <option value="windows">Windows</option>
    //         <option value="mac">MacOS</option>
    //       </select>
    //       <input type="submit" value="Download" />
    //     </div>
    //   </form>

    //   <div id="responseContainer"></div>

    //   <script src="index.js"></script>
    // </>
  );
}

export default Home;