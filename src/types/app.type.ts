export interface Log {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: Source;
}

export interface Source {
  log: string;
  deploymentId: string;
  status: string;
  createdAt: string;
}

export interface DeployLog {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: DeployLogSource;
}

export interface DeployLogSource {
  '@timestamp': string;
  log: string;
  k8s_pod_name: string;
  k8s_namespace_name: string;
  k8s_pod_id: string;
  k8s_host: string;
  k8s_container_name: string;
  k8s_docker_id: string;
  k8s_container_hash: string;
  k8s_labels_id: string;
  'k8s_labels_pod-template-hash': string;
}
