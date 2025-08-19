
import 'package:flutter/material.dart';

class Settings extends StatefulWidget{
  @override
  State<Settings> createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Center(
          child: Text("Settngs"),
        )
      ],
    );
  }
}
