import 'package:flutter/material.dart';
import 'profile.dart';
import 'users.dart';
import 'dashboard.dart';
import 'settings.dart';

class HomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomePageHome(),
    );
  }
}
class HomePageHome extends StatefulWidget{
  @override
  State<HomePageHome> createState() => _HomePageHomeState();
}

class _HomePageHomeState extends State<HomePageHome> {
  int selectedIndex=0;
  var routes = [Dashboard(), Settings(), Profile(), Users()];
  var hidePassword = true;
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
  void openMadal(){
    switch(selectedIndex){
      case 0:
        print("Selected index is $selectedIndex");
        break;
      case 1:
        print("Selected index is $selectedIndex");
        break;
      case 2:
        print("Selected index is $selectedIndex");
        break;
      case 3:
        print("Selected index is $selectedIndex");
        createNewUser(context);
        break;
      default:
        print("Select Index");
    }
  }

  void createNewUser(BuildContext context){
    showModalBottomSheet(
      useSafeArea: true,
        context: context,
        builder: (BuildContext context){
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Center(
              ),
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: TextField(
                  decoration: InputDecoration(
                      label: Text('ID Number'),
                      border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.card_membership)
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: TextField(
                  decoration: InputDecoration(
                    label: Text('Fullname'),
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.account_box) 
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: TextField(
                  decoration: InputDecoration(
                    label: Text('Username'),
                    border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.person_outline)
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: TextField(
                  obscureText: hidePassword,
                  decoration: InputDecoration(
                    label: Text('Password'),
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.password),
                      suffixIcon: IconButton(
                          onPressed: (){
                            maskedUnmaskedPassword();
                          },
                          icon: Icon(Icons.remove_red_eye_outlined))
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all( 15.0),
                child: SizedBox(
                  height: 40,
                  width: MediaQuery.of(context).size.width,
                  child: ElevatedButton(
                    style: ButtonStyle(
                        backgroundColor: WidgetStatePropertyAll(Colors.teal)
                    ),
                    onPressed: (){},
                    child: Text('Add New User', style: TextStyle(color: Colors.white)
                    ),
                  ),
                ),
              ),
            ],
          );
        }
        );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Activities'),
      ),
      drawer: Drawer(),
      body: routes[selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedIndex,
          type: BottomNavigationBarType.fixed,
          onTap: (index){
          setState(() {
            selectedIndex = index;
          });
          },
          items: [
            BottomNavigationBarItem(
                icon: Icon(Icons.dashboard),
                label: 'Home'
            ),
            BottomNavigationBarItem(
                icon: Icon(Icons.settings),
                label: 'Settings'
            ),
            BottomNavigationBarItem(
                icon: Icon(Icons.account_circle),
              label: 'Profile'
            ),
            BottomNavigationBarItem(
                icon: Icon(Icons.list_alt),
              label: 'Users'
            ),

          ]
      ),
      floatingActionButton: FloatingActionButton(
          onPressed: (){
            openMadal();
          },
      child: Icon(Icons.add),
      ),
    );
  }
}
