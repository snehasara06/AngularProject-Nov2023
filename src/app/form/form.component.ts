import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentService } from '../student.service';
import { Course, Student } from '../Student/student';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  // providers: [StudentService]

})
export class FormComponent {








  








  

  userForm: FormGroup;
  academicForm: FormGroup;
  submissionForm: FormGroup;

  userFormData: any;
  academicFormData: any;

  students: Student[] = [];
  private apiUrl = 'http://localhost:8080/students/';
  editMode = false;

  hasFileUploaded: boolean = false;
  showAddedImage: boolean = false;
  selectedFile: File | null = null;
  url = '';
  fileData: any;
  previewLoaded: boolean = false;

  @ViewChild("fileInput") fileInput: any | null = null;
  selectedTabIndex = 0;

  technicalSkills: string[] = [];
  skillList: string[] = ['Artificial Intelligence', 'Data Science', 'Python Programming', 'Java', 'Network Security', '.Net'];

  today = new Date();

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService) {

    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],

      email: [''],
      phone: [''],

      gender: [''],
      dob: [''],

      address: [''],
      state: [''],
      pincode: ['']

    });


    this.academicForm = this.fb.group({
      degree: ['', Validators.required],
      board: ['', Validators.required],
      year: ['', Validators.required],
      subject: ['', Validators.required],
      percentage: ['', Validators.required],
      // technicalSkills: this.fb.array([]) as FormArray,
      technicalSkills: [[], Validators.required],
    });

    this.submissionForm = this.fb.group({
      uploadedFile: ['', Validators.required],
      confirmation: ['', Validators.required]
    });
  } //constructor closing

  get userFormControls() {
    return this.userForm.controls;
  }
  get academicFormControls() {
    return this.academicForm.controls;
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const studentId = params.get('id');
      if (studentId) {
        this.editMode = true;

        this.fetchStudentData(studentId);
      }
    });
  }
  fetchStudentData(studentId: string) {
    this.studentService.getById(parseInt(studentId, 10)).subscribe(
      (studentData: any) => {
        console.log(studentData);

        this.hasFileUploaded = !!studentData.fileData;
        console.log(this.hasFileUploaded)
        this.url = 'data:image/png;base64,' + studentData.fileData;
        // console.log(this.url);

        const byteCharacters = atob(studentData.fileData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        const file = new File([blob], 'image/png', { type: 'image/png' });

        this.selectedFile = file;
        console.log(file);

        this.userForm.patchValue({
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          dob: studentData.dob,
          gender: studentData.gender,
          email: studentData.email,
          phone: studentData.phone,
          address: studentData.address,
          state: studentData.state,
          pincode: studentData.pincode,
        });
        const mappedCourses = studentData.courses.map((course: any) => {
          return course.name;
        });
        this.academicForm.patchValue({
          degree: studentData.degree,
          board: studentData.board,
          subject: studentData.subject,
          year: studentData.year,
          percentage: studentData.percentage,
          technicalSkills: mappedCourses
        })
        this.submissionForm.patchValue({
          // uploadedFile: studentData.file
          // uploadedFile: ''
          // uploadedFile: this.url
        });
      },
      error => {
        console.error('Error fetching student data:', error);
      }
    );
  }
  removeFile() {
    this.hasFileUploaded = false;
    this.selectedFile = null;
    this.submissionForm.get('uploadedFile')?.setValue(null);
  }
  // previewFile() {
  //   const file = this.fileInput.nativeElement.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.fileData = reader.result;
  //     this.previewLoaded = true;
  //   };
  //   if (file) {
  //     reader.readAsArrayBuffer(file);
  //   }
  // }
  onFileSelected(event: any): void {
    this.showAddedImage = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          this.url = event.target.result;
        }
      }
    }
  }
  submit() {
    console.log("FORM 1: ", this.userForm.value);
    console.log("FORM 2: ", this.academicForm.value);

    if (this.userForm.valid && this.academicForm.valid) {
      const formdata = new FormData();
      const dataToSend = {
        userInfo: this.userForm.value,
        academicInfo: this.academicForm.value,
        submissionInfo: this.submissionForm.value
      };
      formdata.append('dataToSend', new Blob([JSON.stringify(dataToSend)], { type: 'application/json' }));

      if (this.selectedFile) {
        formdata.append('file', this.selectedFile);
      }
      // console.log("DATA TO SEND :", dataToSend);
      // if (this.fileInput) {
      //   const file = this.fileInput.nativeElement.files[0];
      //   if (file) {
      //     formdata.append('file', file);
      //   }
      // }
      const headers = new HttpHeaders();


      if (this.editMode) {
        const studentId = this.getStudentId();

        const updatedFormData = new FormData();
        const dataToSend = {
          userInfo: this.userForm.value,
          academicInfo: this.academicForm.value,
        };

        if (this.selectedFile) {
          updatedFormData.append('file', this.selectedFile);
        }else{
          
        }
        
        updatedFormData.append('dataToSend', JSON.stringify(dataToSend));

        // updatedFormData.append('dataToSend', new Blob([JSON.stringify(dataToSend)], { type: 'application/json' }));
        console.log("DATA TO SEND :", dataToSend);

    
        if (this.fileInput) {
          const file = this.fileInput.nativeElement.files[0];
          if (file) {
            formdata.append('file', file);
          }
        }
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n", updatedFormData.get('dataToSend'))
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n", updatedFormData.get('file'))
        this.http.put(`${this.apiUrl}update/${studentId}`, updatedFormData, { responseType: 'text' })
          .subscribe(response => {
            console.log('Student updated:', response);
            // console.log(response);

            Swal.fire({
              title: 'Updated!',
              text: 'Your data has been updated.',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {

              }
              this.router.navigate(['/form']);
              // window.location.reload();

            });
          });
      } else {
        this.http.post(`${this.apiUrl}`, formdata, { headers: headers, observe: 'response', responseType: 'blob' })
          .subscribe(response => {
            const statusCode = response.status;
            if (statusCode === 500) {
              alert("Internal Server error");
            } else {
              console.log('Student registered:', response);
              Swal.fire({
                title: 'Success!',
                text: 'Your data has been registered.',
                icon: 'success',
              });
            }
            // window.location.reload();
          });
      }
    }// userInfo and academicInfo form valid -If condn
    else {
      this.userForm.markAllAsTouched();
      this.academicForm.markAllAsTouched();
      this.submissionForm.markAllAsTouched();
    }
  } // submit() closing


  getTechnicalSkillsControls() {
    return (this.academicForm.get('technicalSkills') as FormArray).controls;
  }

  validateAndMoveToNextTab1() {
    this.markFormGroupTouched(this.userForm);
    if (this.userForm.valid) {
      this.moveToNextTab1();
    }
  }
  validateAndMoveToNextTab2() {
    this.markFormGroupTouched(this.academicForm);
    if (this.academicForm.valid) {
      this.moveToNextTab2();
    }
  }
  // validateAndMoveToNextTab3() {
  //   this.markFormGroupTouched(this.submissionForm);
  //   if (this.submissionForm.valid) {
  //     this.submit();
  //   }
  // }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  moveToNextTab1() {
    if (this.userForm.valid) {
      this.userFormData = this.userForm.value
      if (this.selectedTabIndex < 2) {
        this.selectedTabIndex++;
      }
    }
  }
  moveToNextTab2() {
    if (this.academicForm.valid) {
      this.academicFormData = this.academicForm.value;
      this.selectedTabIndex++;
    }
    else {
      this.academicForm.markAllAsTouched();
    }
  }
  addQ() {
    alert("Qualification added");
  }
  moveToPreviousTab() {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }
  getStudentId(): string | null {
    const studentId = this.route.snapshot.paramMap.get('id');
    return studentId;
  }


  // clear() {
  //   this.userForm.reset();
  //   this.technicalSkills = [];
  // }
}



