package com.example.callapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.view.View;
import android.provider.ContactsContract.*;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    Button callbtn, savebtn, clearbtn;
    EditText t1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        callbtn = findViewById(R.id.callbtn);
        clearbtn = findViewById(R.id.clrbtn);
        savebtn = findViewById(R.id.savebtn);
        t1=findViewById(R.id.editTextPhone);
        clearbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                t1.setText("");
            }
        });
        callbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String number = t1.getText().toString();
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse("tel:" + number));
                startActivity(intent);
            }
        });
        savebtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String number = t1.getText().toString();
                Intent intent = new Intent(Intent.ACTION_INSERT, Contacts.CONTENT_URI);

                intent.putExtra(ContactsContract.Intents.Insert.PHONE,number);
                startActivity(intent);
            }
        });

    }
    public void Button(View view){
        Button btn=(Button)view;
        String digit=btn.getText().toString();
        String number=t1.getText().toString();
        t1.setText(number+digit);
    }
}