import {
  Component,
  signal,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NgStyle} from '@angular/common';
import {NavbarComponent} from '../../../../components/navbar/navbar.component';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {BackgroundColorService} from '../../../../services/background-color/background-color.service';
import {HomeNavComponent} from '../home/components/home-nav/home-nav.component';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [NavbarComponent, MaterialModule, ReactiveFormsModule, NgStyle, HomeNavComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'list', 'member', 'tags', 'note'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  readonly panelOpenState = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selected = 'option2';
}

export interface PeriodicElement {
  title: string;
  list: string;
  member: string;
  tags: string;
  note: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },

  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },

  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },

  {
    title: 'Hom nay toi lau nha',
    list: 'To Do',
    member: 'Quan',
    tags: 'Label',
    note: 'Note',
  },
];
