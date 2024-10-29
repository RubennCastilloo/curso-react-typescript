import { Router } from "express";
import { body, param } from 'express-validator'
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";

const router = Router()

router.post('/', 
    body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
    .notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.createProject
)
router.get('/', ProjectController.getAllProjects)
router.get('/:id', 
    param('id').isMongoId().withMessage('ID No válido'),
    handleInputErrors,
    ProjectController.getProjectById
)
router.put('/:id', 
    param('id').isMongoId().withMessage('ID No válido'),
    body('projectName')
    .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
    .notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID No válido'),
    handleInputErrors,
    ProjectController.deleteProject
)

// Routes for tasks
router.param('projectId', projectExists)
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID No válido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID No válido'),
    body('name')
    .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID No válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID No válido'),
    body('status')
    .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router