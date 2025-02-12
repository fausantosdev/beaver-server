import { Repository } from '@protocols/repository'
import { DeleteUser } from '@protocols/use-cases/user/delete-user'

class DeleteUserUseCase implements DeleteUser {
  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(id: string) {
    const userExists = await this.userRepository.findOne({ id })

    if (!userExists) throw new Error('User not found')

    const result = await this.userRepository.delete({ id })

    return !!result
  }
}

export { DeleteUserUseCase }
