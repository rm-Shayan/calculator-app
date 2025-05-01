document.addEventListener("DOMContentLoaded", () => {
    const calContainer = document.getElementById("cal-container");
    const display = document.getElementById("display");
    const historyPanel = document.getElementById("historyPanel");
    const historyDiv = document.getElementById("history");
    const toggleHistory = document.getElementById("toggleHistory");
  
    let expression = "";
    let history = JSON.parse(localStorage.getItem("history")) || [];
  
    // Show/Hide History Panel
    toggleHistory.addEventListener("click", () => {
      historyPanel.classList.toggle("hidden");
      showHistory();
    });
  
    // Show history from localStorage
    const showHistory = () => {
      if (!history.length) {
        historyDiv.innerHTML = "<p class='text-gray-400'>No history found</p>";
      } else {
        historyDiv.innerHTML = history.map(item => `<div>${item}</div> <hr>`).join() ;
      }
    };
  
    // Update and save history
    const updateHistory = (exp, result) => {
      const record = `${new Date()} ${exp} = ${result}`;
      history.unshift(record);
      if (history.length > 10) history.pop(); // Limit to 10 items
      localStorage.setItem("history", JSON.stringify(history));
    };
  
    // Prevent double operators
    const isOperator = (char) => ["+", "-", "*", "/", "×", "÷"].includes(char);
  
    // Button click logic
    calContainer.addEventListener("click", (e) => {
      const btn = e.target;
      if (!btn.matches("button")) return;
      const value = btn.value;
  
      switch (value) {
        case "C":
          expression = "";
          display.value = "";
          break;
        case "DEL":
          expression = expression.slice(0, -1);
          display.value = expression;
          break;
        case "=":
          try {
            const result = eval(expression);
            updateHistory(expression, result);
            display.value = result;
            expression = result.toString();
          } catch {
            display.value = "Error";
            expression = "";
          }
          break;
        default:
        

        const lastChar = expression.slice(-1);

        // Prevent starting with an operator OR repeating operators
        if (isOperator(value)) {
          if (expression === "" || isOperator(lastChar)) {
            return; // Don't allow operator at start or double operators
          }
        }
        
        expression += value;
        display.value = expression;
      }
    });
  
    // Initial display of history if already saved
    showHistory();
  });
  
  
  