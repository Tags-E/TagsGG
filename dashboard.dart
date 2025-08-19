import 'package:flutter/material.dart';

class Dashboard extends StatefulWidget{
  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Center(
          child: Text("Dashboard"),
        )
      ],
    );
  }
}
