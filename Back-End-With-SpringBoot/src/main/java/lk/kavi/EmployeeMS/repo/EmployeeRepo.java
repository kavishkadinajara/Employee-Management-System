package lk.kavi.EmployeeMS.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.kavi.EmployeeMS.dto.EmployeeDTO;
import lk.kavi.EmployeeMS.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

    void save(EmployeeDTO userDTO);

}
