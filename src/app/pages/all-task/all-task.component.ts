import {Component, signal, ViewChild, OnInit} from '@angular/core';
import {HomeNavComponent} from "../home/home-nav/home-nav.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {MaterialModule} from '../../shared/modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NgStyle} from '@angular/common';
import {BackgroundColorService} from '../../services/background-color/background-color.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [
    NavbarComponent,
    MaterialModule,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent implements OnInit {
  displayedColumns: string[] = ['title', 'list', 'member', 'status', 'note'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  readonly panelOpenState = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  selected = 'option2';

  backgroundImage: string | null = 'https://images.unsplash.com/photo-1542435503-956c469947f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcHxlbnwwfHwwfHx8MA%3D%3D';

  constructor(private backgroundService: BackgroundColorService) {
  }

  ngOnInit(): void {
    this.backgroundService.backgroundImage$.subscribe((imageUrl) => {
      this.backgroundImage = imageUrl;
    });
  }
}


export interface PeriodicElement {
  title: string;
  list: string;
  member: string;
  status: string;
  note: string;


}

const ELEMENT_DATA: PeriodicElement[] = [
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},
  {title:'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},

  {title: 'Hom nay toi lau nha', list: 'To Do', member: 'Quan', status: 'Label', note: 'Note'},


];
