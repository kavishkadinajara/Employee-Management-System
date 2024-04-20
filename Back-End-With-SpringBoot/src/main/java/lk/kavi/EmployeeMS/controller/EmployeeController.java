package lk.kavi.EmployeeMS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.kavi.EmployeeMS.dto.EmployeeDTO;
import lk.kavi.EmployeeMS.dto.ResponseDTO;
import lk.kavi.EmployeeMS.service.EmployeeService;
import lk.kavi.EmployeeMS.util.VarList;

@RestController
@CrossOrigin
@RequestMapping("api/v1/employee")
public class EmployeeController {

    @Autowired 
    private EmployeeService employeeService;
    @Autowired
    private ResponseDTO  responseDTO;

    // SAVE DATA IN DB
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PostMapping("/saveEmployee")
    public ResponseEntity saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            String res = employeeService.saveEmployee(employeeDTO);

            if(res.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            } else if (res.equals("06")) {
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Employee already exists.");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            } else if(res.equals("10")) {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Empty Feilds");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    // UPDATE DB
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @PutMapping("/updateEmployees")
    public ResponseEntity updateEmployees(@RequestBody EmployeeDTO employeeDTO) {
        try {
            String res = employeeService.updateEmployee(employeeDTO);

            if(res.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            } else if(res.equals("01")) {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not any id  matched.");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.NOT_FOUND);

            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // GET ALL EMPLOYEES FROM TABLE
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/findAllEmployees")
    public ResponseEntity findAllEmployees() throws Exception{

        try {
            List<EmployeeDTO> employeeDTOList = employeeService.getAllEmployees();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(employeeDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            
        }
    }

    // SEARCH EMPLOYEE BY ID
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @GetMapping("/searchById/{empId}")
    public ResponseEntity searchByID(@PathVariable int empId){

        try {
            EmployeeDTO employeeDTO = employeeService.searchEmployeeByID(empId);
            
            if(employeeDTO != null) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            } else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not Data Found");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.NOT_FOUND);

            }

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // DELETE EMPLOYEE BY ID
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @DeleteMapping("/deleteEmployee/{empId}")
    public ResponseEntity  deleteEmployee(@PathVariable int empId) {
        
        try {
            String  employeeDTO = employeeService.deleteEmployee(empId);

            if(employeeDTO.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(employeeDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not Data Found");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.NOT_FOUND);

            }


        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
