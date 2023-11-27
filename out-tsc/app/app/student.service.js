import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
export let StudentService = class StudentService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:8080/students/';
    }
    getAllStudents() {
        return this.http.get(`${this.apiUrl}`);
    }
    addNewStudent(dataToSend) {
        return this.http.post(`${this.apiUrl}`, dataToSend);
    }
};
StudentService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], StudentService);
//# sourceMappingURL=student.service.js.map