import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ProjectAccessGuard implements CanActivate {
  constructor(private readonly projectsService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;
    const projectId = request.params.id;

    console.log('userId', userId);
    console.log('projectId', projectId);

    const hasAccess = await this.projectsService.checkProjectAccess(
      projectId,
      userId,
    );

    console.log('hasAccess', hasAccess);

    if (!hasAccess) {
      throw new UnauthorizedException(
        'You do not have access to that project.',
      );
    }

    return true;
  }
}
