import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
export let SampleComponent = class SampleComponent {
    constructor(fb, http) {
        this.fb = fb;
        this.http = http;
        this.students = [];
        this.apiUrl = 'http://localhost:8080/students/';
        this.isFormVisible = false;
        this.fileInput = null;
        this.selectedTabIndex = 0;
        this.courses = [];
        this.courseList = ['Artificial Intelligence', 'Data Science', 'Python Programming', 'Java', 'Network Security', '.Net'];
        this.selectedFile = null;
        this.userForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            address: ['', Validators.required],
            // city: ['', Validators.required],
            state: ['', Validators.required],
            pincode: ['', Validators.required]
        });
        this.academicForm = this.fb.group({
            degree: ['', Validators.required],
            board: ['', Validators.required],
            year: ['', Validators.required],
            subject: ['', Validators.required],
            percentage: ['', Validators.required],
            courses: ['', Validators.required],
        });
        this.submissionForm = this.fb.group({});
    }
    get userFormControls() {
        return this.userForm.controls;
    }
    get academicFormControls() {
        return this.academicForm.controls;
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    moveToNextTab1() {
        if (this.userForm.valid) {
            // this.userFormData=this.userForm
            if (this.selectedTabIndex < 2) {
                this.selectedTabIndex++;
            }
        }
        console.log(this.userForm.controls);
        // this.personalData = {
        //   firstName: this.userForm.get('firstName')?.value,
        //   lastName: this.userForm.get('lastName')?.value,
        //   address: this.userForm.get('address')?.value,
        //   city: this.userForm.get('city')?.value,
        //   state: this.userForm.get('state')?.value,
        //   pincode: this.userForm.get('pincode')?.value,
        //   phone: this.userForm.get('phone')?.value,
        //   dob: this.userForm.get('dob')?.value,
        //   gender: this.userForm.get('gender')?.value,
        //   email: this.userForm.get('email')?.value
        // };
        // this.form1 = this.personalData
        // console.log("FORM 1: ", this.form1);
    }
    moveToNextTab2() {
        if (this.academicForm.valid) {
            this.academicFormData = this.academicForm.value;
            // if (this.selectedTabIndex < 2) {
            this.selectedTabIndex++;
        }
        else {
            this.academicForm.markAllAsTouched();
        }
    }
    // this.academicData = {
    //   degree: this.academicForm.get('degree')?.value,
    //   board: this.academicForm.get('board')?.value,
    //   subject: this.academicForm.get('subject')?.value,
    //   year: this.academicForm.get('year')?.value,
    //   percentage: this.academicForm.get('percentage')?.value,
    //   allcourses: this.courses
    // };
    // this.form2 = this.academicData;
    // console.log(this.academicData.allcourses);
    // console.log(this.form1)
    // console.log("FORM 2: ", this.form2);
    // }
    add() {
        this.isFormVisible = !this.isFormVisible;
    }
    addQ() {
        console.log("Qualification added");
        // this.formSubmitted.push({
        //   degree: this.academicForm.get('degree')?.value,
        //   board: this.academicForm.get('board')?.value,
        //   subject: this.academicForm.get('subject')?.value,
        //   year: this.academicForm.get('year')?.value,
        //   percentage: this.academicForm.get('percentage')?.value,
        //   courses: this.academicForm.get('courses')?.value
        // });
        // console.log(this.formSubmitted)
    }
    moveToPreviousTab() {
        if (this.selectedTabIndex > 0) {
            this.selectedTabIndex--;
        }
    }
    // onFileSelected(event: any): void {
    //    const selectedFile = event.target.files[0] ;
    //   this.updateSubmitButtonState();
    //   if (selectedFile) {
    //     this.selectedFileName = selectedFile.name;
    //     console.log("FILE NAME:", this.selectedFileName); // Log the file name
    //   } else {
    //     this.selectedFileName = 'No file selected';
    //   }
    // }
    // phoneError() {
    //   if (this.phone.hasError('required')) {
    //     return 'You must enter phone number';
    //   }
    //   if (this.phone.hasError('minlength')) {
    //     return 'Minimum length is 10';
    //   }
    //   if (this.phone.hasError('maxlength')) {
    //     return 'Maximum length is 10';
    //   }
    //   return this.phone.hasError('phone') ? 'Not a valid phone number' : '';
    // }
    // getErrorMessage() {
    //   if (this.email.hasError('required')) {
    //     return 'You must enter a value';
    //   }
    //   return this.email.hasError('email') ? 'Not a valid email' : '';
    // }
    // firstNameError() {
    //   if (this.firstName.hasError('required')) {
    //     return 'You must enter a value';
    //   }
    //   if (this.firstName.hasError('minlength')) {
    //     return 'Minimum length is 4';
    //   }
    //   if (this.firstName.hasError('maxlength')) {
    //     return 'Maximum length is 40';
    //   }
    //   return this.firstName.hasError('firstName') ? 'Not a valid name' : '';
    // }
    // public GetFileOnLoad(event: any) {
    //   this.selectedFileName = event.target.files[0];
    //   this.updateSubmitButtonState();
    //   var file = event.target.files[0];
    //   var element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
    //   if (element != null) {
    //     element.value = file?.name;
    //   }
    // }
    submit() {
        console.log("FORM 1: ", this.userForm.value);
        console.log("FORM 2: ", this.academicForm.value);
        if (this.userForm.valid && this.academicForm.valid) {
            const formdata = new FormData();
            const dataToSend = {
                userInfo: this.userForm.value,
                academicInfo: this.academicForm.value,
            };
            //       formData.append('employeeData', new Blob([JSON.stringify(employeeData)], { type: 'application/json' }));
            formdata.append('dataToSend', new Blob([JSON.stringify(dataToSend)], { type: 'application/json' }));
            console.log("DATA TO SEND :", dataToSend);
            console.log("DATA 1 :", JSON.stringify(this.fileInput));
            if (this.fileInput) {
                const file = this.fileInput.nativeElement.files[0];
                if (file) {
                    formdata.append('file', file);
                }
            }
            console.log("DATA 2 :", JSON.stringify(this.fileInput));
            console.log(this.fileInput);
            // console.log(typeof(JSON.stringify(this.fileInput)))
            console.log("FORM DATA", formdata);
            const headers = new HttpHeaders();
            headers.set('Accept', 'multipart/form-data');
            //   this.studentService.addNewStudent(formdata, { headers: headers }).subscribe(
            this.http.post(`${this.apiUrl}`, formdata, { headers: headers }).subscribe({
                next: (response) => {
                    console.log('Student registered:', response);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your data has been registered.',
                        icon: 'success',
                    });
                    // this.reload();
                    this.clear();
                },
                error: (error) => {
                    console.error('Error creating student:', error);
                }
            });
            // this.studentService.addNewStudent(formdata).subscribe(
            //   (response) => {
            //     console.log(response);
            //     Swal.fire("Completed!", "Successfully registered!", "success").then(() => {
            // Reset the form and clear input fields
            // this.userForm.reset();
            // this.academicForm.reset();
            // this.submissionForm.reset();
            // this.isSubmitDisabled = true;
            // this.selectedFileName = new File([], '');
            // this.selectedTabIndex = 0;
            //     });
            //   },
            //   (error) => {
            //     console.error(error);
            //     Swal.fire("Error!", "Failed to submit the data.", "error");
            //   }
            // )
        }
        // else {
        //   Swal.fire("Error!", "Please check the confirmation checkbox.", "error");
        // }
        // }
        else {
            // Swal.fire("Error!", "Please upload the document.", "error");
            this.userForm.markAllAsTouched();
            this.academicForm.markAllAsTouched();
            this.submissionForm.markAllAsTouched();
        }
    }
    clear() {
        this.userForm.reset();
        this.courses = [];
    }
};
__decorate([
    ViewChild("fileInput")
], SampleComponent.prototype, "fileInput", void 0);
SampleComponent = __decorate([
    Component({
        selector: 'app-sample',
        templateUrl: './sample.component.html',
        styleUrls: ['./sample.component.css']
    })
], SampleComponent);
//# sourceMappingURL=sample.component.js.map