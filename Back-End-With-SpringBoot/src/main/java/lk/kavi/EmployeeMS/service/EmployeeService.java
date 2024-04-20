package lk.kavi.EmployeeMS.service;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.kavi.EmployeeMS.dto.EmployeeDTO;
import lk.kavi.EmployeeMS.entity.Employee;
import lk.kavi.EmployeeMS.repo.EmployeeRepo;
import lk.kavi.EmployeeMS.util.VarList;

@Service
@Transactional
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper modelMapper;

    // SAVE DATA IN DB
    public String saveEmployee(EmployeeDTO employeeDTO) {

        try {
            // Check if any required fields are null
            if (employeeDTO.getEmpName() == null || 
                employeeDTO.getEmpDepartment() == null || 
                employeeDTO.getEmpSalary() == 0 || 
                employeeDTO.getEmpTele() == null
            ) {
                return VarList.RSP_FAIL; // Return error response if any required field is null
            }

            // Check if employee with the same ID already exists
            if (employeeRepo.existsById(employeeDTO.getEmpId())) {
                return VarList.RSP_DUPLICATED;

            } else {
                employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));
                return VarList.RSP_SUCCESS;

            }

        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return a generic error response
            return VarList.RSP_ERROR;
        }
    }

    // UPDATE DB
    public String updateEmployee(EmployeeDTO employeeDTO) {

        try {
            
            if(employeeRepo.existsById(employeeDTO.getEmpId())) {

                employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));
                return VarList.RSP_SUCCESS;

            } else {
                return VarList.RSP_NO_DATA_FOUND;

            }
        } catch (Exception e) {
             // Log the exception for debugging purposes
             e.printStackTrace();
             // Return a generic error response
             return VarList.RSP_ERROR;
        }
    }

    // GET ALL EMPLOYEES FROM TABLE
    public List<EmployeeDTO> getAllEmployees() {

        List<Employee> employeeList = employeeRepo.findAll();
        return modelMapper.map(employeeList, new TypeToken<ArrayList<EmployeeDTO>>(){}.getType());
    }

    // SEARCH EMPLOYEE BY ID
    public EmployeeDTO searchEmployeeByID(int empId){

            
        if(employeeRepo.existsById(empId)) {
            Employee employee = employeeRepo.findById(empId).orElse(null);
            return  modelMapper.map(employee, EmployeeDTO.class);
        } else {
            return null;
        }   
    }

    // DELETE EMPLOYEE BY ID
    public String deleteEmployee(int empId) {
        try {
        
            if(employeeRepo.existsById(empId)){
                employeeRepo.deleteById(empId);
                return VarList.RSP_SUCCESS;

            } else {
                return  VarList.RSP_NO_DATA_FOUND;

            }

        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return a generic error response
            return VarList.RSP_ERROR;
        }
    }
}
