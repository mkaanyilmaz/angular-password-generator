import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  val: number = 8;
  selectedValues: string[] = ["lowercase"];
  password: string = "";
  result: string;
  lowercase = "abcdefghijklmnopqrstuvwxyz";
  uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  numbers = "1234567890";
  symbols = "£$&()*+[]@#^-_!?";
  strength: string;
  color: string;
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.generatePassword();
  }

  generatePassword() {
    this.result = "";
    this.password = "";
    this.selectedValues.forEach((item) => {
      switch (item) {
        case "lowercase":
          this.password += this.lowercase;
          break;
        case "uppercase":
          this.password += this.uppercase;
          break;
        case "number":
          this.password += this.numbers;
          break;
        case "symbol":
          this.password += this.symbols;
          break;
      }
    });
    let tempResult = [...this.password];

    for (let i = 0; i < this.val; i++) {
      this.result += tempResult[Math.floor(Math.random() * tempResult.length)];
    }

    this.strength =
      this.selectedValues.length === 1
        ? "Very Easy"
        : this.selectedValues.length === 2
        ? "Easy"
        : this.selectedValues.length === 3
        ? "Medium"
        : this.selectedValues.length === 4
        ? "Hard"
        : "";

    this.color =
      this.selectedValues.length === 1
        ? "text-amber-400"
        : this.selectedValues.length === 2
        ? "text-amber-500"
        : this.selectedValues.length === 3
        ? "text-orange-500"
        : this.selectedValues.length === 4
        ? "text-red-700"
        : "";
  }

  copyToClipboard() {
    if (this.result) {
      const selBox = document.createElement("textarea");
      selBox.style.position = "fixed";
      selBox.style.left = "0";
      selBox.style.top = "0";
      selBox.style.opacity = "0";
      selBox.value = this.result;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand("copy");
      document.body.removeChild(selBox);
      this.toastr.success("Successfully copied!", this.result);
    }
  }
}
