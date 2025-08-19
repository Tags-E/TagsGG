import 'package:flutter/material.dart';

class Profile extends StatefulWidget{
  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Center(
        ),
        CircleAvatar(
          radius: 80.0,
          backgroundImage: NetworkImage('https://scontent.fdvo3-1.fna.fbcdn.net/v/t39.30808-6/516594503_704756842437971_8860293588534889838_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGMv6zxWgylMAcwFN5roCf56-I6z0keNqLr4jrPSR42osLgI_z_sETvwAB3I0DTIbTZe07n3e4X_WGxwxpAQtSX&_nc_ohc=FI3i18Ej9H4Q7kNvwE3NlX4&_nc_oc=AdlI24CygfBxZkZtBdoaYeRvxEu8RZcBfHuKA2cnXRvAY7kGkJWv-oECzHsDDfGn3P0&_nc_zt=23&_nc_ht=scontent.fdvo3-1.fna&_nc_gid=NZw6P9l9uG1eL8gv5VTFNA&oh=00_AfUPvkHZ1LGqbHCTiCHvjKoIXqLnk1Z4x8G83P2YuH0m-A&oe=68A05EA2',scale: 1.0),
        ),
        Padding(
          padding: EdgeInsets.only(top: 20.0, bottom: 10.0),
            child: Text("Edcel M. Mamac")

        ),
        Padding(
            padding: EdgeInsets.only(bottom: 20.0),
          child: Text("Bachelor of Information Technology, 3rd Year"),
        )
      ],
    );
  }
}
