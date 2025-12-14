import { Component, OnInit } from "@angular/core";
import { Sweet } from "src/app/models/sweet.model";
import { SweetService } from "src/app/services/sweet.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  sweet: Sweet = {
    name: '',
    category: '',
    price: 0,
    quantity: 0
  };

  sweets: Sweet[] = [];

  // Restock input
  restockQty: number = 0;

  constructor(private sweetService: SweetService) {}

  ngOnInit() {
    this.loadSweets();
  }

  loadSweets() {
    this.sweetService.getAllSweets().subscribe(data => {
      this.sweets = data;
    });
  }

  addSweet() {
    this.sweetService.addSweet(this.sweet).subscribe(() => {
      alert('Sweet added');
      this.sweet = { name: '', category: '', price: 0, quantity: 0 };
      this.loadSweets();
    });
  }

  deleteSweet(id: number) {
    this.sweetService.deleteSweet(id).subscribe(() => {
      this.loadSweets();
    });
  }

  // Restock sweet
  restock(id: number) {
    if (this.restockQty <= 0) {
      alert('Enter valid quantity');
      return;
    }

    this.sweetService.restockSweet(id, this.restockQty)
      .subscribe(() => {
        this.restockQty = 0;
        this.loadSweets();
      });
  }
}
