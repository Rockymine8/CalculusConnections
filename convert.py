def to_latex(input_string):
    # Replace mathematical symbols with LaTeX commands
    input_string = input_string.replace("^", "^{}")
    input_string = input_string.replace("sqrt", "\\sqrt{}")
    input_string = input_string.replace("/", "\\frac{}{}")

    # Wrap the string in $...$ to indicate it's a LaTeX expression
    return f"{input_string}"

while True:
    # Get input from the user
    input_string = input("Enter a mathematical expression (or 'quit' to exit): ")

    # Exit the loop if the user enters 'quit'
    if input_string.lower() == 'quit':
        break

    # Convert the input to LaTeX and print it
    print(to_latex(input_string))