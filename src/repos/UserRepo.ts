import { getRandomInt } from '@src/util/misc';
import { User } from '@src/models/index'

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(): Promise<any> {
  const data = await User.findAll({raw: true})
  return data;
}

async function getUserByName(name: string): Promise<any> {
  const data = await User.findOne({
    where: {
      name: name
    }
  });
  return data;
}

async function getUserById(id: number): Promise<any> {
  const data = await User.findOne({
    where: {
      id: id
    }
  });
  return data;
}

// **** Export default **** //

export default {
  getAll,
  getUserByName,
  getUserById,
} as const;
