import 'package:flutter/material.dart';
import 'package:mamac_edcel/sign_up_screen.dart';

class LoginScreen extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginScreenHome(),
    );
  }
}
class LoginScreenHome extends StatefulWidget{
  @override
  State<LoginScreenHome> createState() => _LoginScreenHomeState();
}

class _LoginScreenHomeState extends State<LoginScreenHome> {
  var idController = TextEditingController();
  var fnameController = TextEditingController();
  var usernameController = TextEditingController();
  var passwordController1 = TextEditingController();
  var passwordController2 = TextEditingController();

  var hidePassword1 = true;
  var hidePassword2 = true;
  void maskedUnmaskedPassword1() {
    if (hidePassword1 == true) {
      setState(() {
        hidePassword1 = false;
      });
    }
    else {
      setState(() {
        hidePassword1 = true;
      });
    }
  }
  void maskedUnmaskedPassword2(){

    if(hidePassword2 == true){
      setState(() {
        hidePassword2 = false;
      });
    }
    else{
      setState(() {
        hidePassword2 = true;
      });
    }
  }
  void validateInputs(){
    var id = idController.text;
    var fname = fnameController.text;
    var username = usernameController.text;
    var password1 = passwordController1.text;
    var password2 = passwordController2.text;
    if(id.isEmpty) {
      print("ID Number is Empty!");
    }
    else if(fname.isEmpty){
      print("Fullname Is Empty!");
    }
    else if(username.isEmpty){
      print("Username is Empty!");
    }
    else if(password1.isEmpty){
      print("Password is Empty!");
    }
    else if(password2.isEmpty) {
      print("Confirm Password is Empty!");
    }
    else if(password1 != password2) {
        print("Password does not match!");
      }
    else if(password1 == password2) {
      print("Password Match!");
    }
    else{
      print("The value of ID Number is $id, the value of Fullname is $fname, Username is $username the Password is $password1, and the value of Confirm Password is $password2");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
              padding: const EdgeInsets.all(12.0),
              child: Center(
                child: SizedBox(
                  height: 700,
                  width: 400,
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          CircleAvatar(
                            radius: 80.0,
                            backgroundImage: NetworkImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4Knf7CzX_mF6ZxqGA1WOOBYp84urUep9qvhe5017nRoijY5SxnqZSwDTvPNhsOTmNr4&usqp=CAU',scale: 1.0),

                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 20.0, bottom: 20.0),
                            child: Text('Create an Account',
                              style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8.0),
                            child: TextField(
                              controller: idController,
                              decoration: InputDecoration(
                                  label: Text('ID Number'),
                                  border: OutlineInputBorder(),
                                  prefixIcon: Icon(Icons.card_membership)
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8.0),
                            child: TextField(
                              controller: fnameController,
                              decoration: InputDecoration(
                                label: Text('Fullname'),
                                border: OutlineInputBorder(),
                                prefixIcon: Icon(Icons.text_fields),

                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: TextField(
                              controller: usernameController,
                              decoration: InputDecoration(
                                label: Text('Username'),
                                border: OutlineInputBorder(),
                                prefixIcon: Icon(Icons.text_fields),

                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: TextField(
                              controller: passwordController1,
                              obscureText: hidePassword1,
                              decoration: InputDecoration(
                                  label: Text('Password'),
                                  border: OutlineInputBorder(),
                                  prefixIcon: Icon(Icons.password),
                                  suffixIcon: IconButton(
                                      onPressed: (){
                                        maskedUnmaskedPassword1();
                                      },
                                      icon: Icon(Icons.remove_red_eye_outlined))
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: TextField(
                              controller: passwordController2,
                              obscureText: hidePassword2,
                              decoration: InputDecoration(
                                  label: Text('Confirm Password'),
                                  border: OutlineInputBorder(),
                                  prefixIcon: Icon(Icons.password),
                                  suffixIcon: IconButton(
                                      onPressed: (){
                                        maskedUnmaskedPassword2();
                                      },
                                      icon: Icon(Icons.remove_red_eye_outlined))
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 30.0),
                            child: SizedBox(
                              height: 40,
                              width: MediaQuery.of(context).size.width,
                              child: ElevatedButton(
                                style: ButtonStyle(
                                    backgroundColor: WidgetStatePropertyAll(Colors.teal)
                                ),
                                onPressed: (){
                                  validateInputs();
                                },
                                child: Text('SIGNUP', style: TextStyle(color: Colors.white)
                                ),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 15.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text('Already Registered?'),
                                TextButton(
                                    onPressed: (){
                                      Navigator.of(context).push(MaterialPageRoute(builder: (BuildContext context)=>SignupScreen()));
                                    },
                                    child: Text('Login Here')
                                )
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              )
          )
        ],
      ),
    );
  }
}
