
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:mamac_edcel/login_screen_dart.dart';
import 'homepage.dart';

class SignupScreen extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SignupScreenHome(),
    );
  }
}
class SignupScreenHome extends StatefulWidget{
  @override
  State<SignupScreenHome> createState() => _SignupScreenHomeState();
}

class _SignupScreenHomeState extends State<SignupScreenHome> {
  var hidePassword = true;
  var usernameController = TextEditingController();
  var passwordController = TextEditingController();
  var staticUsername = "admin";
  var staticPassword = "Password123";
  void maskedUnmaskedPassword() {
    if (hidePassword == true) {
      setState(() {
        hidePassword = false;
      });
    }
    else {
      setState(() {
        hidePassword = true;
      });
    }
  }

  void validateInputs(){
    var username = usernameController.text;
    var password = passwordController.text;
    if(username.isEmpty){
      AwesomeDialog(
        context: context,
        dialogType: DialogType.error,
        title: 'Error',
        desc: 'Username is Required',
        width: MediaQuery.of(context).size.width/2,
        btnOkOnPress: (){}
      ).show();
      print("Username is Empty!");
    }
    else if(password.isEmpty){
      AwesomeDialog(
          context: context,
          dialogType: DialogType.error,
          title: 'Error',
          desc: 'Password is Required',
          width: MediaQuery.of(context).size.width/2,
          btnOkOnPress: (){}
      ).show();
      print("Password is Empty!");
    }
    else{
      validateUsernameAndPassword(username, password);
    }
  }

  void validateUsernameAndPassword(String username, String password){
    if(staticUsername != username){
      AwesomeDialog(
        context: context,
        title: "Error",
        desc: "Invalid Username provided",
        width: MediaQuery.of(context).size.width/2,
        btnOkOnPress: (){}
      ).show();
    }
    else if(staticPassword != password){
      AwesomeDialog(
          context: context,
          title: "Error",
          desc: "Invalid Password provided",
          width: MediaQuery.of(context).size.width/2,
          btnOkOnPress: (){}
      ).show();
    }
    else{
      Navigator.of(context).push(MaterialPageRoute(builder: (BuildContext context)=>HomePageHome()));
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
                  height: 550,
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
                            child: Text('Please Login',
                              style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8.0),
                            child: TextField(
                              controller: usernameController,
                              decoration: InputDecoration(
                                  label: Text('Username'),
                                  border: OutlineInputBorder(),
                                  prefixIcon: Icon(Icons.person_outline)
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8.0),
                            child: TextField(
                              controller: passwordController,
                              obscureText: hidePassword,
                              decoration: InputDecoration(
                                  label: Text('Password'),
                                  border: OutlineInputBorder(),
                                  prefixIcon: Icon(Icons.key_off_outlined),
                                  suffixIcon: IconButton(
                                      onPressed: (){
                                        maskedUnmaskedPassword();
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
                                child: Text('LOGIN', style: TextStyle(color: Colors.white),

                                ),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 15.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text('No Account?'),
                                TextButton(
                                    onPressed: (){
                                      Navigator.of(context).push(MaterialPageRoute(builder: (BuildContext context)=>LoginScreen()));
                                    },
                                    child: Text('Sign Up')
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
