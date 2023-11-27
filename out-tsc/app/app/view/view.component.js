import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { StudentService } from '../student.service';
export let ViewComponent = class ViewComponent {
    constructor(studentService) {
        this.studentService = studentService;
        this.students = [];
    }
    ngOnInit() {
        this.getStudents();
    }
    getStudents() {
        this.studentService.getAllStudents().subscribe((data) => {
            this.students = data;
            console.log(this.students);
        });
    }
    editStudent() {
        console.log("EDIT");
        // this.studentService.editStudent()
    }
    deleteStudent() {
        console.log("DELETE");
        // this.studentService.deleteStudent
    }
};
ViewComponent = __decorate([
    Component({
        selector: 'app-view',
        templateUrl: './view.component.html',
        styleUrls: ['./view.component.css'],
        providers: [StudentService]
    })
], ViewComponent);
//# sourceMappingURL=view.component.js.map