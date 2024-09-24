import axios from 'axios';

import dotenv from 'dotenv';

import fs from 'fs/promises';
import path from 'path';

dotenv.config({
  path: path.resolve('./', './.env.local'),
});

const updateTenantInfo = async () => {
  const tenantId = process.env.TENANT_ID;
  const baseUrl = process.env.API_URL;

  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Tenant-ID': tenantId,
    },
  });

  try {
    const { data } = await instance.get(`${baseUrl}/tenant/me`);
    await fs.mkdir('./public/static/svg/tenant', { recursive: true });
    await fs.mkdir('./public/static/images/seo', { recursive: true });
    await fs.mkdir('./public/static/files', { recursive: true });

    const info = data;
    await fs.writeFile(
      path.join(process.cwd(), './public/static/files', 'tenantInfo.json'),
      JSON.stringify({ name: info?.name, main_logo: info?.main_logo, icon: info?.icon, favicon: info?.favicon }),
    );
  } catch (error) {
    console.log('Error fetching tenant info', error);
  }

  // const logoUrl = data?.logo?.url;
  // if (logoUrl) {
  //   const logoResponse = await axios({
  //     url: logoUrl,
  //     responseType: 'arraybuffer',
  //   });
  //   const logoBuffer = Buffer.from(logoResponse.data, 'binary');
  //   await fs.writeFile(path.join(process.cwd(), './public/static/svg/tenant', 'logo.svg'), logoBuffer);
  // }
};

updateTenantInfo();
