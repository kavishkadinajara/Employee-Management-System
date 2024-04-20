package lk.kavi.EmployeeMS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EmployeeDTO {

    private int empId;
    private String empName;
    private String empDepartment;
    private  double empSalary;
    private String empTele;
}
